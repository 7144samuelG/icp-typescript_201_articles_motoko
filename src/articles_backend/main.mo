import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Types "types";
import Int "mo:base/Int";
import Text "mo:base/Text";

actor devshub {

  type RegisterPayload = {
    username : Text;
    avatarurl : Text;
    userbio : Text;
  };

  type Article = Types.article;
  type Comment = Types.comment;
  type Developer = Types.developer;
  type Result<Ok, Err> = Types.Result<Ok, Err>;
  type HashMap<K, V> = Types.HashMap<K, V>;

  let devsonprincipals : HashMap<Principal, Developer> = HashMap.HashMap<Principal, Developer>(0, Principal.equal, Principal.hash);
  let devsarticles : HashMap<Text, Article> = HashMap.HashMap<Text, Article>(1, Text.equal, Text.hash);

  public shared ({ caller }) func registerDeveloper() : async Result.Result<Text, Text> {
    // check if developer is already registered
    switch (devsonprincipals.get(caller)) {

      // if developer is not registered yet
      case (null) {
        let newDeveloper : Developer = {
          principalId = caller;
          articles = [];
        };

        devsonprincipals.put(caller, newDeveloper);
        return #ok("user registerde sucessfully");

      };

      case (?_logined) {
        return #err("you are already registered into devshub try to login");
      };

    };
  };

  public shared ({ caller }) func getdeveloperPrincipal() : async Result.Result<Developer, Text> {
    switch (devsonprincipals.get(caller)) {
      // check if developer is already registered
      case (null) {
        return #err("failed");
      };

      case (?developer) {
        // if developer is not registered yet
        return #ok(developer);
      };
    };
  };

  // function to write an article
  public shared ({ caller }) func writeArticle(articleTitle : Text, articledescription : Text, articleavatar : Text) : async Text {
    let id : Text = Int.toText(Time.now());

    let newarticle : Article = {
      id;
      by = caller;
      articleTitle = articleTitle;
      articledescription = articledescription;
      likes = [];
      comments = [];
      articleAvatar = articleavatar;
      created_at = Time.now();
    };

    switch (devsonprincipals.get(caller)) {
      // if developer is not registered yet return error
      case (null) {
        return "failed to write artilce";
      };
      // if developer is registered write article and update the developer articles array
      case (?developer) {
        let articlesBuffer = Buffer.fromArray<Article>(developer.articles);
        articlesBuffer.add(newarticle);
        let updatedArticles = Buffer.toArray(articlesBuffer);
        let updatedDeveloper : Developer = {
          principalId = developer.principalId;
          articles = updatedArticles;
        };

        devsonprincipals.put(caller, updatedDeveloper);
        devsarticles.put(id, newarticle);
        return "Article added successfully";
      };

    };
  };

  //like an article

  public shared ({ caller }) func likeAnArticle(articleId : Text) : async Text {
    //verify if developer is laready logged in
    switch (devsarticles.get(articleId)) {
      case null {
        return "not logged in ";
      };
      case (?articleFound) {
        //update likes
        let likesBuffer = Buffer.fromArray<Principal>(articleFound.likes);
        likesBuffer.add(caller);
        let updatedLikes = Buffer.toArray(likesBuffer);
        let updatedArticle : Article = {
          id = articleFound.id;
          by = articleFound.by;
          articleTitle = articleFound.articleTitle;
          articledescription = articleFound.articledescription;
          likes = updatedLikes;
          comments = articleFound.comments;
          articleAvatar = articleFound.articleAvatar;
          created_at = articleFound.created_at;
        };
        devsarticles.put(articleFound.id, updatedArticle);
        //update on developers articles array
        return "Like added successfully";
      };

    };
  };

  //get a specific article
  public query func getArticle(articleId : Text) : async Result.Result<?Article, Text> {
    switch (devsarticles.get(articleId)) {
      case null {
        return #err("No article found");
      };
      case (?article) {
        return #ok(?article);
      };
    };
  };

  //owner delet the article
  public shared ({ caller }) func deleteArticle(articleId : Text) : async Text {
    switch (devsarticles.get(articleId)) {
      case (null) {
        return "No article found";
      };
      case (?article) {
        if (Principal.equal(caller, article.by)) {
          devsarticles.delete(articleId);

          return "Article deleted successfully";
        } else {
          return "Only the owner can delete this article";
        };
      };

    };
  };

  public shared ({ caller }) func addCommentToArticle(articleId : Text, commentmessage : Text, username : Text) : async Text {
    //verify if developer is laready logged in
    let newComment : Comment = {
      by = caller;
      username = username;
      commentmessage = commentmessage;
      time_commented = Time.now();
    };

    switch (devsarticles.get(articleId)) {
      case null {
        return "not logged in ";
      };
      case (?articleFound) {
        //update likes
        let commentsBuffer = Buffer.fromArray<Comment>(articleFound.comments);

        commentsBuffer.add(newComment);
        let updatedComment = Buffer.toArray(commentsBuffer);
        let updatedArticle : Article = {
          id = articleFound.id;
          by = articleFound.by;
          articleTitle = articleFound.articleTitle;
          articledescription = articleFound.articledescription;
          likes = articleFound.likes;
          comments = updatedComment;
          articleAvatar = articleFound.articleAvatar;
          created_at = articleFound.created_at;
        };
        devsarticles.put(articleFound.id, updatedArticle);
        //update on developers articles array
        return "Like added successfully";
      };

    };
  };

  // function to remove all comment from the article
  public func removeAllComments(articleId : Text) : async Text {
    let articleopt = devsarticles.get(articleId);

    switch (articleOpt) {
      case (?article) {
        let updatedArticle = { ...article; comments = [] };
        devsarticles.put(articleId, updatedArticle);
        return "Comments removed successfully";
      };

      case null {
        return "Article not found";
      };
    };
  };

  //function to retrives all articles
  public query func getAllArticles() : async [Article] {

    return Iter.toArray(devsarticles.vals());
  };

  //whaoami
  public shared query (msg) func getid() : async Principal {
    return msg.caller;
  };

};

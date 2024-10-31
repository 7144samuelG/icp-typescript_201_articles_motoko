import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Time "mo:base/Time";

module {
    // Represents a comment made by a user
    public type Comment = {
        by: Principal;          // The principal of the user who made the comment
        username: Text;        // The username of the commenter
        message: Text;         // The content of the comment
        timeCommented: Time.Time; // The time the comment was made
    };

    // Represents an article
    public type Article = {
        id: Text;               // Unique identifier for the article
        author: Principal;      // The principal of the author
        title: Text;           // The title of the article
        description: Text;      // A brief description of the article
        likes: [Principal];     // List of principals who liked the article
        comments: [Comment];    // List of comments on the article
        avatar: Text;           // URL or identifier for the article's avatar/image
        createdAt: Time.Time;   // The time the article was created
    };

    // Represents a user and their associated articles
    public type User = {
        articles: [Article]; // List of articles authored by the user
    };

    // Represents a developer and their authored articles
    public type Developer = {
        principalId: Principal; // The principal ID of the developer
        articles: [Article];     // List of articles authored by the developer
    };

    // Type aliases for HashMap and Result for convenience
    public type HashMap<K, V> = HashMap.HashMap<K, V>;
    public type Result<Ok, Err> = Result.Result<Ok, Err>;

    // Example functions could be added here to interact with the types
    // e.g., functions to create articles, add comments, etc.
    
    // A function to create a new article (example)
    public func createArticle(
        author: Principal,
        title: Text,
        description: Text,
        avatar: Text
    ) : Result<Article, Text> {
        let newArticle = Article({
            id = Text.concat("article_", Text.fromNat(Time.now())); // Generate a unique ID
            author = author;
            title = title;
            description = description;
            likes = [];
            comments = [];
            avatar = avatar;
            createdAt = Time.now();
        });

        // Here, you would typically store the article in a storage structure

        return Result.Ok(newArticle);
    }

    // A function to add a comment to an article (example)
    public func addComment(
        articleId: Text,
        commenter: Principal,
        username: Text,
        message: Text
    ) : Result<Comment, Text> {
        let newComment = Comment({
            by = commenter;
            username = username;
            message = message;
            timeCommented = Time.now();
        });

        // Here, you would typically append the comment to the article's comment list

        return Result.Ok(newComment);
    }

    // Additional functions can be added to manage articles, users, and developers as needed
}

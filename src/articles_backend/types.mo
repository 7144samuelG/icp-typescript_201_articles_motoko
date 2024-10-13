import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Time "mo:base/Time";
module{
    public type  comment={
        by:Principal;
        username:Text;
        commentmessage:Text;
        time_commented:Time.Time;
    };
   
  
    public type article={
        id:Text;
        by:Principal;
        articleTitle:Text;
        articledescription:Text;
        likes:[Principal];
        comments:[comment];
        articleAvatar:Text;
        created_at:Time.Time;
    };
    
   
public type users={
    articles:[article];
};
    public type developer={
       
        principalId:Principal;
        
        articles:[article];    
    
    };
    public type HashMap<K, V> = HashMap.HashMap<K,V>;
    public type Result<Ok,Err> =Result.Result<Ok,Err>;
}
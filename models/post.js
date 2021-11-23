class Post {
  constructor(postId, userId, date, image, text, audio, video, upvotes, commentIds){
      this.postId = postId;
      this.userId = userId;
      this.date = date;
      this.image = image;
      this.text = text;
      this.audio = audio;
      this.video = video;
      this.upvotes = upvotes;
      this.commentIds = commentIds
  }
}

export default Post;
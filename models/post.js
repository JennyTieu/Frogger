class Post {
  constructor(postId, userId, image, text, audio, video, upvoteAmount, downvoteAmount, commentsAmount, commentIds){
      this.postId = postId;
      this.userId = userId;
      this.image = image;
      this.text = text;
      this.audio = audio;
      this.video = video;
      this.upvoteAmount = upvoteAmount;
      this.downvoteAmount = downvoteAmount;
      this.commentsAmount = commentsAmount;
      this.commentIds = commentIds
  }
}

export default Post;
class Profile {
  constructor(id, email, password, firstName, lastName, userName, birthday, gender, city, country, image, job, bio, follows, bookmarks, theme){
      this.id = id;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.userName = userName;
      this.birthday = birthday;
      this.gender = gender;
      this.city = city;
      this.country = country;
      this.image = image;
      this.job = job;
      this.bio = bio;
      this.follows = follows;
      this.bookmarks = bookmarks;
      this.theme = theme;
  }
}
export default Profile;
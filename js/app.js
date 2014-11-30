var Message = Em.Object.extend({
	text: null,
	owner: null,
	time: null,
	comments: null,
	upvotes: 0,
	downvotes: 0
});

var User = Em.Object.extend({
	fname: null,
	lname: null,
	_password: null,
	email: null,
	isAdmin: false,
	password: function(key, value){
		if(value){
			this.set('_password', md5(value));
		}
		return this.get("_password");
	}.property('_password'),
	imageUrl: function(){
		return 'http://gravatar.com/avatar/' + md5(this.get('email'));
	}.property('email')
});

var users = [];

var messages = (function(cnt){
	var messages = [];
	while(cnt--){
		var user = User.create({
				fname: cnt,
				email: "sunnykrgupta@gmail.com",
				password: "test"
			});
		messages.push(Message.create({
			text: "Sample Text"+cnt,
			author: user,
			time: new Date(),
			comments: []
		}));
		users.push(user);
	}
	return messages;
})(3);

App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('index',{path: '/'});
  this.route('saved',{path: '/saved'});
  this.route('login',{path: '/login'});
  this.route('logout',{path: '/logout'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return { messages: messages,
    	user: users[0]
    };
  }
});

App.LoginRoute = Ember.Route.extend({
});

App.MessageView = Ember.View.extend({
	templateName: 'message'
});
App.CreateMessageView = Ember.View.extend({
	templateName: 'createMessage',
	layoutName: 'modalLayout'
});
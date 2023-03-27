package com.messengerProject.SpringMessenger.Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.messengerProject.SpringMessenger.Models.Message;
import com.messengerProject.SpringMessenger.Models.User;

@RestController
public class MessagingController {

	ArrayList<User> allUsers;
	User JackHarris;
	User testUser;
	User testUser2;

	public MessagingController() {

		allUsers = new ArrayList<User>();

		JackHarris = new User("JackHarris", "AdminPassword", true);
		testUser = new User("Jack123", "password1", false);
		testUser2 = new User("Jack987", "password2", false);

		allUsers.add(JackHarris);
		allUsers.add(testUser);
		allUsers.add(testUser2);
	}

	@GetMapping("/")
	public String testAPI() {
		System.out.println("-- Test API called --");
		return "success";
	}

	@GetMapping("/returnAllUsernames")
	ArrayList<String> returnAllUsernames() {

		ArrayList<String> output = new ArrayList<String>();

		for (User user : allUsers) {
			output.add(user.getUsername());
		}
		return output;
	}

	@GetMapping("/returnAllUsers")
	ArrayList<User> returnAllUsers() {

		ArrayList<User> output = new ArrayList<User>();

		for (User user : allUsers) {
			output.add(user);
		}
		return output;
	}

	@GetMapping("/checkUserExists/{targetUsername}")
	boolean checkUserExists(@PathVariable String targetUsername) {

		ArrayList<String> allUsernames = returnAllUsernames();

		for (String returnedUsername : allUsernames) {
			if (returnedUsername.equals(targetUsername)) {
				return true;
			}
		}
		return false;
	}

	@GetMapping("/createUser/{username}/{password}")
	String createUser(@PathVariable String username, @PathVariable String password) {

		boolean nameTaken = checkUserExists(username);
		ArrayList<User> allReturnedUsers = returnAllUsers();

		if (nameTaken == false) {
			User newUser = new User(username, password, false);

			for (User existantUsername : allReturnedUsers) {
				if (existantUsername.getUsername().equals(newUser.getUsername())) {
					return "Username taken";
				}
				allUsers.add(newUser);
				return "New user created: " + username + " " + password;
			}
		}
		return "Username taken, user not added: " + username;
	}

	@GetMapping("/removeUser/{username}")
	String removeUser(@PathVariable String username) {

		boolean nameInUse = checkUserExists(username);

		if (nameInUse == true) {

			ArrayList<User> allReturnedUsers = returnAllUsers();

			for (User existantUser : allReturnedUsers) {
				if (existantUser.getUsername().equals(username) && !existantUser.getUsername().equals("JackHarris")) {
					allUsers.remove(existantUser);
					return "User removed";
				}
			}
		}
		return "Username not in use, so not deleted: " + username;

		// Create user, add to repository/ArrayList<User>
		// Currently adds to allUsers
	}


	// TODO Make this a proper @PostMapping with title and body not visible in URL
	@GetMapping("/sendMessage/{senderUsername}/{recipientUsername}/{title}/{body}")
	String sendMessage(@PathVariable String senderUsername, @PathVariable String recipientUsername,
			@PathVariable String title, @PathVariable String body) {
		System.out.println("MESSAGE SEND ATTEMPT");
		Message messageToSend = new Message(allUsers, senderUsername, recipientUsername, title, body);

		boolean confirmRecipientExists = checkUserExists(recipientUsername);

		if (confirmRecipientExists) {

			for (User user : allUsers) {

				if (user.getUsername().equals(senderUsername)) {
					user.getSentMessages().add(messageToSend);
				}

				if (user.getUsername().equals(recipientUsername)) {
					user.getReceivedMessages().add(messageToSend);
					return "Message sent!";
				}
			}
		}
		return "Failed to send message";

		// Adds the message to the recipients ArrayList<Message> of received messages
	}

	@GetMapping("/checkMessagesReceived/{username}")
	ArrayList<Message> checkMessagesReceived(@PathVariable String username) {
		System.out.println("Retreiving RECEIVED messages...");
		ArrayList<Message> messageList = new ArrayList<Message>();
		
		for (User user : allUsers) {
			if (user.getUsername().equals(username)) {
				for (Message message : user.getReceivedMessages()) {
					messageList.add(message);
				}
			}
		}
		return messageList;
		// Returns all messages sent TO the user whose username matches the given one
	}

	@GetMapping("/checkMessagesSent/{username}")
	ArrayList<Message> checkMessagesSent(@PathVariable String username) {
		System.out.println("Retreiving SENT messages...");
		ArrayList<Message> messageList = new ArrayList<Message>();
		
		for (User user : allUsers) {
			if (user.getUsername().equals(username)) {
				for (Message message : user.getSentMessages()) {
					messageList.add(message);
				}
			}
		}
		return messageList;
		// Returns all messages sent BY the user whose username matches the given one
	}
	
	
	
	
//	 FROM HERE:
	
//	 TODO
//	@GetMapping
//	String deleteMessage(...)
//	deletes given message from sender + recipient
//	
	
	
	@GetMapping("/signIn/{username}/{password}")
	String signIn(@PathVariable String username, @PathVariable String password) {

		StringBuilder uniqueKey = new StringBuilder();

		// Will send off username and password
		// If that matches an account, it returns that user's unique key
		// That unique key is remembered and used to validate messages, etc

		// user.uniqueKey.set(uniqueKey);
		return uniqueKey.toString();

	}

	@PostMapping("/signUp/{username}/{password}")
	String signUp(@PathVariable String username, @PathVariable String password) {

		// IF username is free, and IF password is at least 7 chars, makes an account
		// Possible return Strings: account made, username taken, password too short

		StringBuilder returnedResult = new StringBuilder();
		return returnedResult.toString();

	}

}

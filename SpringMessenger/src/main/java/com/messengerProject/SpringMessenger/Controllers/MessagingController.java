package com.messengerProject.SpringMessenger.Controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.messengerProject.SpringMessenger.Models.Message;
import com.messengerProject.SpringMessenger.Models.User;

@CrossOrigin
@RestController
public class MessagingController {

	// Make permanent with JPA
	int messageCount;

	// TEST DATA - to insert once after JPA is integrated
	ArrayList<User> allUsers;
	User JackHarris;
	User testUser;
	User testUser2;

	public MessagingController() {

		messageCount = 0;

		allUsers = new ArrayList<User>();

		// Test data
		JackHarris = new User("JackHarris", "AdminPassword", true);
		testUser = new User("Jack123", "password1", false);
		testUser2 = new User("Jack987", "password2", false);

		// For test consistency
		JackHarris.setUniqueKey(0.5461992905539923);

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
	public ArrayList<String> returnAllUsernames() {

		ArrayList<String> output = new ArrayList<String>();

		for (User user : allUsers) {
			output.add(user.getUsername());
		}
		return output;
	}

	@GetMapping("/findByUsername/{username}")
	public User findByUsername(@PathVariable String username) {

		boolean confirmExists = checkUserExists(username);

		if (confirmExists) {
			for (User user : allUsers) {
				if (user.getUsername().equals(username)) {
					return user;
				}
			}
		}
		return null;
	}

	@GetMapping("/returnAllUsers")
	public ArrayList<User> returnAllUsers() {
		ArrayList<User> output = new ArrayList<User>();
		for (User user : allUsers) {
			output.add(user);
		}
		return output;
	}

	@GetMapping("/checkUserExists/{targetUsername}")
	public boolean checkUserExists(@PathVariable String targetUsername) {

		ArrayList<String> allUsernames = returnAllUsernames();

		for (String returnedUsername : allUsernames) {
			if (returnedUsername.toLowerCase().equals(targetUsername.toLowerCase())) {
				return true;
			}
		}
		return false;
	}

	@GetMapping("/createUser/{username}/{password}")
	public String createUser(@PathVariable String username, @PathVariable String password) {

		boolean nameTaken = checkUserExists(username);
		ArrayList<User> allReturnedUsers = returnAllUsers();

		if (nameTaken == false) {
			User newUser = new User(username, password, false);

			allUsers.add(newUser);
			return "New user created: " + username + " " + password;
		}
		return "Username taken, user not added: " + username;
	}

	@GetMapping("/removeUser/{username}")
	public String removeUser(@PathVariable String username) {

		if (username.equals("JackHarris")) {
			return "Cannot delete admin accounts";
		}

		boolean nameInUse = checkUserExists(username);

		if (nameInUse == true) {

			ArrayList<User> allReturnedUsers = returnAllUsers();

			for (User existantUser : allReturnedUsers) {
				if (existantUser.getUsername().equals(username)) {
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
	public String sendMessage(@PathVariable String senderUsername, @PathVariable String recipientUsername,
			@PathVariable String title, @PathVariable String body) {
		System.out.println("MESSAGE SEND ATTEMPT");

		if (senderUsername.equals(recipientUsername)) {
			return "Cannot send message to self";
		}

		boolean senderExists = checkUserExists(senderUsername);
		boolean recipientExists = checkUserExists(recipientUsername);

		if (senderExists == false) {
			return "No such sender exists";
		}
		if (recipientExists == false) {
			return "No such recipient exists";
		}

		Message messageToSend = new Message(allUsers, senderUsername, recipientUsername, title, body, messageCount);
		messageCount++;

		boolean confirmRecipientExists = checkUserExists(recipientUsername);
		if (confirmRecipientExists) {

			for (User sender : allUsers) {

				if (sender.getUsername().equals(senderUsername)) {
					sender.getSentMessages().add(messageToSend);
				}
			}

			for (User recipient : allUsers) {
				if (recipient.getUsername().equals(recipientUsername)) {
					recipient.getReceivedMessages().add(messageToSend);
				}
			}
		}
		return "Message sent!";
//		return "Failed to send message";

	}

	@GetMapping("/checkMessagesReceived/{username}")
	public ArrayList<Message> checkMessagesReceived(@PathVariable String username) {
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
	public ArrayList<Message> checkMessagesSent(@PathVariable String username) {
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

//	TO DO - Is returnAllMessage redundant?
//	Make the path var in checkMessagesSent/Received optional and just return everything if no var given?
// Or is that a security hazard? If I forget to append the user

	@GetMapping("/returnAllMessages")
	public ArrayList<Message> returnAllMessages() {
		System.out.println("Returning all messages...");

		ArrayList<Message> allMessages = new ArrayList<Message>();

		for (User user : allUsers) {
			for (Message message : user.getReceivedMessages()) {
				if (!allMessages.contains(message)) {
					allMessages.add(message);
				}
			}
		}
		return allMessages;

	}

	@GetMapping("/deleteMessage/{senderUsername}/{recipientUsername}/{messageReference}")
	public String deleteMessage(@PathVariable String senderUsername, @PathVariable String recipientUsername,
			@PathVariable int messageReference) {

		for (User user : allUsers) {
			for (Message message : user.getReceivedMessages()) {
				if (message.getUserMessageCount() == messageReference) {
					user.getReceivedMessages().remove(message);
					User sender = findByUsername(message.getSenderUsername());
					sender.getSentMessages().remove(message);
					message = null;
					return "Message deleted";
				}
			}
		}
		return "Message not found. Nothing deleted";
	}

	@GetMapping("/signIn/{username}/{password}")
	public String signIn(@PathVariable String username, @PathVariable String password) {
		for (User user : allUsers) {
			if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
				return user.getUniqueKey().toString();
			}
		}
		return "No user found matching that username and password combination";
	}

}

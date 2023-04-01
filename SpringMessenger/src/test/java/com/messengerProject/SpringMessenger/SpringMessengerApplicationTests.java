package com.messengerProject.SpringMessenger;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;

import com.messengerProject.SpringMessenger.Controllers.MessagingController;
import com.messengerProject.SpringMessenger.Models.Message;
import com.messengerProject.SpringMessenger.Models.User;

@SpringBootTest
public class SpringMessengerApplicationTests {

	MessagingController controller = new MessagingController();

	@BeforeEach
	public void setUp() {
		controller = new MessagingController();
	}

	@Test
	public void testAPI() {
		String output = controller.testAPI();
		assertEquals(output, "success");
	}

	@Test
	public void returnAllUserNamesTest() {
		ArrayList<String> allReturnedUsers = controller.returnAllUsernames();
		ArrayList<String> expectedOutput = new ArrayList<String>();
		expectedOutput.add("JackHarris");
		expectedOutput.add("Jack123");
		expectedOutput.add("Jack987");
		assertEquals(allReturnedUsers, expectedOutput);
	}

	@Test
	public void findByUserName_Success() {
		User outputUser = controller.findByUsername("JackHarris");
		assert (outputUser.getUsername().equals("JackHarris"));
	}

	@Test
	public void findByUserName_NoSuchUser() {
		User outputUser = controller.findByUsername("NO_USER");
		assert (outputUser == null);
	}

	@Test
	public void returnAllUsers() {
		ArrayList<User> returnedUsers = controller.returnAllUsers();
		ArrayList<String> returnedUsernames = new ArrayList<String>();
		for (User user : returnedUsers) {
			returnedUsernames.add(user.getUsername());
		}

		ArrayList<String> expectedUsers = new ArrayList<String>();
		expectedUsers.add("JackHarris");
		expectedUsers.add("Jack123");
		expectedUsers.add("Jack987");
		assertEquals(returnedUsernames, expectedUsers);
	}

	@Test
	public void checkUserExists_Success() {
		boolean output = controller.checkUserExists("JackHarris");
		assertEquals(output, true);
	}

	@Test
	public void checkUserExists_NoSuchUser() {
		boolean output = controller.checkUserExists("Nobody");
		assertEquals(output, false);
	}

	@Test
	public void createUser_Success() {
		String newUsername = "NewPerson";
		String newPass = "NewPass";
		String outputUserCreate = controller.createUser(newUsername, newPass);
		assertEquals(outputUserCreate, "New user created: " + newUsername + " " + newPass);
	}

	@Test
	public void createUser_UsernameTaken() {
		String newUsername = "JackHarris";
		String newPass = "NewPass";
		String outputUserCreate = controller.createUser(newUsername, newPass);
		assertEquals(outputUserCreate, "Username taken, user not added: " + newUsername);
	}

	@Test
	public void removeUser_UserExistsSuccess() {
		String nameToTest = "Jack123";
		String nameExists = controller.removeUser(nameToTest);
		assertEquals(nameExists, "User removed");
	}

	@Test
	public void removeUser_FailureCannotDeleteAdmin() {
		String nameToTest = "JackHarris";
		String nameExists = controller.removeUser(nameToTest);
		assertEquals(nameExists, "Cannot delete admin accounts");
	}

	@Test
	public void removeUser_UsernameNotInUse() {
		String nameToTest = "Fake-Name";
		String nameExists = controller.removeUser(nameToTest);
		assertEquals(nameExists, "Username not in use, so not deleted: " + nameToTest);
	}

	@Test
	public void sendMessage_Success() {
		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		User recipientUser = controller.findByUsername(recipient);

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		String expectedOutput = "Message sent!";

		assertEquals(messageSendOutput, expectedOutput);
	}

	@Test
	public void sendMessage_FailureSenderNotFound() {
		String sender = "FakeData";
		String recipient = "Jack123";
		String testTitle = "TestTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		User recipientUser = controller.findByUsername(recipient);

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		String expectedOutput = "No such sender exists";

		assertEquals(senderUser, null);
		assertEquals(messageSendOutput, expectedOutput);
	}

	@Test
	public void sendMessage_FailureSenderMatchesRecipient() {
		String sender = "Jack123";
		String recipient = "Jack123";
		String testTitle = "TestTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		User recipientUser = controller.findByUsername(recipient);

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		String expectedOutput = "Cannot send message to self";

		assertEquals(messageSendOutput, expectedOutput);
	}

	@Test
	public void sendMessage_FailureNoSuchSender() {
		String sender = "FakeSender";
		String recipient = "Jack123";
		String testTitle = "TestTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		User recipientUser = controller.findByUsername(recipient);

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		String expectedOutput = "No such sender exists";

		assertEquals(messageSendOutput, expectedOutput);
	}

	@Test
	public void sendMessage_FailureNoSuchRecipient() {
		String sender = "Jack123";
		String recipient = "FakeRecipient";
		String testTitle = "TestTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		User recipientUser = controller.findByUsername(recipient);

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		String expectedOutput = "No such recipient exists";

		assertEquals(messageSendOutput, expectedOutput);
	}

	@Test
	public void checkMessagesReceived_Success() {

		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		User recipientUser = controller.findByUsername(recipient);
		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);

		assertEquals(recipientUser.getReceivedMessages().size(), 1);
	}

	@Test
	public void checkMessagesSent_Success() {

		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		User senderUser = controller.findByUsername(sender);
		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);

		assertEquals(senderUser.getSentMessages().size(), 1);
	}

	@Test
	public void returnAllMessages_SuccessOneMessage() {

		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		ArrayList<Message> allMessages = controller.returnAllMessages();

		assertEquals(allMessages.size(), 1);
	}

	@Test
	public void returnAllMessages_SuccessZeroMessages() {

		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		ArrayList<Message> allMessages = controller.returnAllMessages();

		assertEquals(allMessages.size(), 0);
	}

	@Test
	public void deleteMessage_success() {
		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		ArrayList<Message> allMessages = controller.returnAllMessages();

		String deleteOutput = controller.deleteMessage(sender, recipient, 0);
		assertEquals(deleteOutput, "Message deleted");
	}

	@Test
	public void deleteMessage_FailureNoMessageFound() {
		String sender = "JackHarris";
		String recipient = "Jack123";
		String testTitle = "testTitle";
		String testBody = "testBody";

		String messageSendOutput = controller.sendMessage(sender, recipient, testTitle, testBody);
		ArrayList<Message> allMessages = controller.returnAllMessages();

		String deleteOutput = controller.deleteMessage(sender, recipient, 10);
		assertEquals(deleteOutput, "Message not found. Nothing deleted");
	}

	@Test
	public void signIn_SuccessCorrectDetails() {
		String username = "JackHarris";
		String password = "AdminPassword";
		String uniqueKey = "0.5461992905539923";
		String signInResult = controller.signIn(username, password);
		assertEquals(signInResult, uniqueKey);
	}

	@Test
	public void signIn_FailureIncorrectDetails() {
		String username = "FakeUsername";
		String password = "FakePassword";
		String errorMessage = "No user found matching that username and password combination";
		String signInResult = controller.signIn(username, password);
		assertEquals(signInResult, errorMessage);
	}

}

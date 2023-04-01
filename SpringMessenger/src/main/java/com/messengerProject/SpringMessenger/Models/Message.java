package com.messengerProject.SpringMessenger.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Message {

	public Message(ArrayList<User> allUsers, String senderUsername, String recipientUsername, String title, String body,
			int messageCount) {
		super();
		this.senderUsername = senderUsername;
		this.recipientUsername = recipientUsername;
		this.title = title;
		this.body = body;
		this.timeStamp = LocalDateTime.now();

		for (User user : allUsers) {
			if (user.getUsername().equals(senderUsername)) {
				this.senderUniqueKey = user.getUniqueKey();
			}
			if (user.getUsername().equals(recipientUsername)) {
				this.recipientUniqueKey = user.getUniqueKey();
				this.userMessageCount = messageCount;
			}
		}
	}

	private String senderUsername;
	private String recipientUsername;
	private double senderUniqueKey;
	private double recipientUniqueKey;
	private String title;
	private String body;
	private int userMessageCount;
	private LocalDateTime timeStamp;

	public int getUserMessageCount() {
		return userMessageCount;
	}

	public void setUserMessageCount(int userMessageCount) {
		this.userMessageCount = userMessageCount;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getSenderUsername() {
		return senderUsername;
	}

	public void setSenderUsername(String senderUsername) {
		this.senderUsername = senderUsername;
	}

	public String getRecipientUsername() {
		return recipientUsername;
	}

	public void setRecipientUsername(String recipientUsername) {
		this.recipientUsername = recipientUsername;
	}

	public double getSenderUniqueKey() {
		return senderUniqueKey;
	}

	public void setSenderUniqueKey(double senderUniqueKey) {
		this.senderUniqueKey = senderUniqueKey;
	}

	public double getRecipientUniqueKey() {
		return recipientUniqueKey;
	}

	public void setRecipientUniqueKey(double recipientUniqueKey) {
		this.recipientUniqueKey = recipientUniqueKey;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

}

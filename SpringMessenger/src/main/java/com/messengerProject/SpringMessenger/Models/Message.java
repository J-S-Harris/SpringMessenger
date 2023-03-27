package com.messengerProject.SpringMessenger.Models;

import java.util.ArrayList;

public class Message {
	
		public Message(ArrayList<User> allUsers, String senderUsername, String recipientUsername, String title, String body) {
		super();
		this.senderUsername = senderUsername;
		this.recipientUsername = recipientUsername;
		this.title = title;
		this.body = body;
		
		for (User user : allUsers) {
			if (user.getUsername().equals(senderUsername)) {
				this.senderUniqueKey = user.getUniqueKey();
			}
			if (user.getUsername().equals(recipientUsername)) {
				this.recipientUniqueKey = user.getUniqueKey();
			}
		}
		
	}
		
		private String senderUsername;
		private String recipientUsername;
		double senderUniqueKey;
		double recipientUniqueKey;
		private String title;
		private String body;
		
		
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

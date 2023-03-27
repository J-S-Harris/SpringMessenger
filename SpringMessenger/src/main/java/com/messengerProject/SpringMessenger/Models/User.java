package com.messengerProject.SpringMessenger.Models;

import java.util.ArrayList;

public class User {
	
	public User(String username, String password, boolean adminPrivileges) {
		this.username = username;
		this.password = password;
		this.adminPrivileges = adminPrivileges;
		this.uniqueKey = Math.random();
		this.receivedMessages = new ArrayList<Message>();
		this.sentMessages = new ArrayList<Message>();
	}

	private double uniqueKey; // To be used to identify users
	private String username;
	private String password;
	private boolean adminPrivileges;
	private ArrayList<Message> receivedMessages;
	private ArrayList<Message> sentMessages;
	
	
	
	public boolean getAdminPrivileges() {
		return adminPrivileges;
	}
	public void setAdminPrivileges(boolean adminPrivileges) {
		this.adminPrivileges = adminPrivileges;
	}
	public Double getUniqueKey() {
		return uniqueKey;
	}
	public void setUniqueKey(double uniqueKey) {
		this.uniqueKey = uniqueKey;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public ArrayList<Message> getReceivedMessages() {
		return receivedMessages;
	}
	public void setReceivedMessages(ArrayList<Message> receivedMessages) {
		this.receivedMessages = receivedMessages;
	}
	public ArrayList<Message> getSentMessages() {
		return sentMessages;
	}
	public void setSentMessages(ArrayList<Message> sentMessages) {
		this.sentMessages = sentMessages;
	}
	
	
	
}

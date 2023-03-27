package com.messengerProject.SpringMessenger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.messengerProject.SpringMessenger.Controllers.MessagingController;

@SpringBootApplication
public class SpringMessengerApplication {

	public static void main(String[] args) {
		
//		MessagingController controller = new MessagingController();
		
		SpringApplication.run(SpringMessengerApplication.class, args);
	}

}

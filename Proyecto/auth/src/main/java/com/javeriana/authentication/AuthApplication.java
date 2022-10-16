package com.javeriana.authentication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;

@SpringBootApplication
public class AuthApplication {
	@LoadBalanced
	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

}

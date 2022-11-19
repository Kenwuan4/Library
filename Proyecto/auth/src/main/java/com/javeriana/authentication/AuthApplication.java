package com.javeriana.authentication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
/**
 * En esta es la aplicacion de spring boot
 *
 * @author  Mateo Rocero y Javier Ramírez
 * @version 1.0
 * @since   2022-10-16
 */
@SpringBootApplication
public class AuthApplication {
	@LoadBalanced
	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

}

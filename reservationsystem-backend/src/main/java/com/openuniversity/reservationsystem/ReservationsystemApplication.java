package com.openuniversity.reservationsystem;

import com.openuniversity.reservationsystem.configs.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class ReservationsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationsystemApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
		FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new CorsFilter());
		registrationBean.setUrlPatterns(Arrays.asList("/*"));
		return registrationBean;
	}
}

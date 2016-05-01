package springmvc;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;

public class Aspectj {

	@Around("test")
	public void around(ProceedingJoinPoint joinpoint) throws Throwable {
		System.out.println("before");
		joinpoint.proceed();
		System.out.println("after");
	}
	
	public void test() {
		System.out.println("hfhfh");
	}

}

package springmvc;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import dao.investorDao;
import model.Investor;
import service.investorService;
public class investorTest {

	public static void main(String[] args) {
	
	/*	investor sql = */
		
		Investor user = new Investor("10994145262@qq.com","isql","Ð¡°×","154224");
		
		@SuppressWarnings("resource")
		ApplicationContext context = new ClassPathXmlApplicationContext("dataSource.xml");
		
		investorDao newuser = (investorDao) context.getBean("investor");
		/*newuser.insert(user);*/
		
		/*Investor userPassword = new Investor("1099461262@qq.com","145");
		newuser.updatePassword(userPassword);*/
		
		if(newuser.getInvestorByEmail("1262@qq.com") == null) {
			System.out.println("fhfh");
		} else {
			System.out.println("success");
		}
		
		if(newuser.getInvestorByIdCard("254") == null) {
			System.out.println("idcard");
		}
		/*System.out.println(newuser.getInvestorByEmail("1099461262@qq.com").getEmail());*/
		
		
	}

}

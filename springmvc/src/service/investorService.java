package service;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import dao.investorDao;
public class investorService {
	 private static ApplicationContext context = new FileSystemXmlApplicationContext("dataSource.xml");
	
	private static investorDao newuser = (investorDao) context.getBean("investor");
	
	public investorDao getInvestorDao() {
		return investorService.newuser;
	}
}

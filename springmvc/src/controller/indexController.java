package controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;


@Controller
public class indexController {
	
	@RequestMapping("/")
	public String showIndex(HttpServletRequest req, Map<String, Integer> Model) {
		/*String uid = "u00";
		String sessionValue = "555";
		HttpSession session = req.getSession();
		session.setAttribute(uid, sessionValue);*/
		Model.put("flag", 0);
		return "customer/customer-index";
	}

}

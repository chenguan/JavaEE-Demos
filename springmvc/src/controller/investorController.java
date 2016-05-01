package controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Investor;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import dao.investorDao;

@Controller
@RequestMapping("/investor")
public class investorController {

	private ApplicationContext context = new ClassPathXmlApplicationContext(
			"dataSource.xml");
	private investorDao newuser = (investorDao) context.getBean("investor");

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(HttpServletRequest req, HttpSession session,
			Map<String, String> model) {

		String username = req.getParameter("username");
		String password = req.getParameter("password");

		Investor checkauth = newuser.getInvestorByEmail(username);

		if (checkauth == null) {
			return "redirect:/investor/login";
		}

		if (checkauth.getPassword().equals(password)) {
			session.setAttribute("investor", checkauth);
			return "redirect:/investor/index";
		}
		return "redirect:/investor/login";
	}

	@RequestMapping({ "/", "/index" })
	public String index(HttpServletRequest req, Map<String, Integer> model) {
		model.put("flag", 0);
		return "investor/logined-invest-index";
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session, Map<String, Integer> model) {
		if (session.getAttribute("citiuser") != null) {
			session.setAttribute("citiuser", null);
		}
		model.put("flag", 0);
		return "redirect:/customer/index";
	}

	@RequestMapping("/investModel")
	public String investModel(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/user-corporate-mode-finance-patch";
	}

	@RequestMapping("/releaseTender")
	public String releaseTender(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/release_tender_offers";
	}

	@RequestMapping("/appliedInvest")
	public String appliedInvest(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/applied-investment-sign";
	}

	@RequestMapping("/infoCenter")
	public String getInfoCenter(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 0);

		return "investor/info-center";
	}

	@RequestMapping("/infoRecords")
	public String getInfoRecords(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 2);

		return "investor/info-records";
	}

	@RequestMapping("/infoTransform")
	public String getInfoTransform(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 3);

		return "investor/info-transform";
	}

	@RequestMapping("/infoCredit")
	public String getInfoCredit(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 6);

		return "investor/info-credit";
	}

	@RequestMapping("/infoTemporary")
	public String getInfoTemporary(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 5);

		return "investor/info-temporary";
	}

	@RequestMapping("/infoRegular")
	public String getInfoRegular(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 4);

		return "investor/info-regular";
	}

	@RequestMapping("/resourceAsset")
	public String getResourceAsset() {
		return "investor/personal_center_assets_management";
	}

	@RequestMapping("/inews")
	public String inews() {
		return "investor/private_center_my_news_directional";
	}

	@RequestMapping("/directionDown")
	public String getDirectionDown() {
		return "investor/inews-message-direction-down";
	}

	@RequestMapping("/ifollow")
	public String getIFollow() {
		return "investor/personal-attiontion";
	}

	@RequestMapping("/moreInvestor")
	public String getMoreInvestor(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/moreInvestor";
	}

	@RequestMapping("/debtPurchase")
	public String getDebtPurchase() {
		return "investor/release_debt_purchase";
	}

	@RequestMapping("/consulting")
	public String getConsulting() {
		return "investor/consulting";
	}

	@RequestMapping("/infoPolicy")
	public String getInoPolicy(Map<String, Integer> model) {
		model.put("flag", 0);
		return "investor/info-policy";
	}

	@RequestMapping("/infoMarket")
	public String getInfoMarket(Map<String, Integer> model) {
		model.put("falg", 0);
		return "investor/info-market";
	}

	@RequestMapping("/manage")
	public String getManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/investorpatten_survey_of_investment";
	}

	@RequestMapping("/stockManage")
	public String getStockManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/stock-manage";
	}

	@RequestMapping("/stockRightManage")
	public String getStockRightManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/stockright-manage";
	}

	@RequestMapping("/einquiryProtocol")
	public String getEInquiryProTocol(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/eletronic-contrating-inquiry-protocol";
	}

	@RequestMapping("/investorChat")
	public String getInvestorChat(HttpSession session, Map<String, Object> model) {
		model.put("flag", (Integer) 1);

		String sessionChar = (String) session.getAttribute("citiuser");
		String[] sessionArray = sessionChar.split("@");
		int sessionDot = (sessionArray[1].toString()).indexOf(".");
		model.put("session",
				sessionArray[0] + sessionArray[1].substring(0, sessionDot)
						+ sessionArray[1].substring(sessionDot + 1));
		return "investor/investor-chat";
	}

	@RequestMapping("/resavation")
	public String getResavation(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/service-chat-resavation";
	}

	@RequestMapping("/privateNews")
	public String getPrivateNews(Map<String, Integer> model) {
		return "investor/private-news";
	}

	@RequestMapping("/newsManagment")
	public String getNewsManagment() {
		return "investor/inews-managment";
	}

	@RequestMapping("/privateDebtList")
	public String getPrivateDebtList(Map<String, Integer> model) {
		model.put("leftOn", 1);
		return "investor/private-debt-list";
	}
}

package controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import model.companyuser;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.TextMessage;

import webSocket.webSocketServer;

@Controller
@RequestMapping("/company")
public class companyController {

	@RequestMapping({ "/", "/index" })
	public String getIndex(Map<String, Integer> model) {
		model.put("flag", 0);
		return "company/business-index";
	}

	@RequestMapping("/corporateModel")
	public String getCorporateModel(Map<String, Integer> model) {
		model.put("flag", 1);
		return "company/corporate-mode-finance-patch";
	}

	@RequestMapping("/manage")
	public String getManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "company/company-manage";
	}

	@RequestMapping("/appliedCompany")
	public String getAppliedCompany(Map<String, Integer> model) {
		model.put("flag", 1);
		return "company/check-finacing-sign";
	}

	@RequestMapping("/einquiryProtocol")
	public String getEinquiryProtocol(Map<String, Integer> model) {
		model.put("flag", 1);
		return "company/eletronic-contrating-inquiry-protocol";
	}

	@RequestMapping("/infoPublish")
	public String getInfoPublish(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftNav", 0);
		return "company/company-issue";
	}

	@RequestMapping("/ipublish")
	public String getIPublish(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftNav", 3);
		return "company/ipublish";
	}

	@RequestMapping("/creditRelease")
	public String getCreditRelease(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftNav", 2);
		return "company/info-credit-release";
	}

	@RequestMapping("/ifollow")
	public String getIFollw(Map<String, Integer> model) {
		return "company/personal-attiontion";
	}

	@RequestMapping("/inews")
	public String getINews() {
		return "company/private_center_my_news_directional";
	}

	@RequestMapping("/directionDown")
	public String getDirectionDown() {
		return "company/inews_direction_down";
	}

	@RequestMapping("/financepublish")
	public String getpublish() {
		return "company/finacing-publish";
	}

	@RequestMapping("/chat")
	public String getChat(HttpSession session, Map<String, Object> model) {
		String sessionChar = (String) session.getAttribute("citiuser");
		String[] sessionArray = sessionChar.split("@");
		int sessionDot = (sessionArray[1].toString()).lastIndexOf(".");
		model.put("session",
				sessionArray[0] + sessionArray[1].substring(0, sessionDot)
						+ sessionArray[1].substring(sessionDot + 1));
		return "company/company-chat";
	}

	@RequestMapping("/resavation")
	public String getResavation() {
		return "company";
	}

	@RequestMapping("/privateList")
	public String getPrivateList() {
		return "company/publish-private-list";
	}

	@RequestMapping("/modifyContract")
	public String getmodifyContract() {
		return "company/modify-contract";
	}

	@RequestMapping("/raisedbonds")
	public String getRaisedBonds() {
		return "company/privately-raised-bonds";
	}

	@RequestMapping("/communicationHistory")
	public String getCommunicationHistory() {
		return "company/communication-history";
	}

	@RequestMapping("/currentReservation")
	public String getCurrentReservation() {
		return "company/current-reservation";
	}

	@RequestMapping("/finishedReservation")
	public String getFinishedReservation() {
		return "company/finished-reservation";
	}

	public webSocketServer getWebSocketServer() {
		return new webSocketServer();
	}

	@RequestMapping("/chatMsg")
	@ResponseBody
	public Object getUnReadMessage(HttpSession session) throws IOException {
		Map<String, String> map = new HashMap<String, String>();
		companyuser user = (companyuser) session.getAttribute("citiuser");
		getWebSocketServer().sendMessageToUSer(user.getEmail(),
				new TextMessage("hello world"));
		map.put("connect", "v");
		return map;
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session) {

		if (session.getAttribute("citiuser") instanceof companyuser) {
			session.setAttribute("citiuser", null);
			return "redirect:/customer/index";
		}

		return "redirect:/customer/login";
	}
}

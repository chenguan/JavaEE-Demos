package model;

public class Investor {
	private String uid;
	private String email;
	private String password;
	private String username;
	private String IdCard;
	private String companyName;
	private String legalRepresentative;
	private String legalRepresentativewt;
	private String businesslicence;
	private String investAddress;
	private String companyAddress;
	private String registerAddress;
	private int registerCapital;
	private String investFiled;
	private String investStage;
	private int investCycle;
	private String headquartersAddress;
	private String logoUrl;

	public Investor() {

	}

	public Investor(String email, String password, String username,
			String IdCard) {
		this.email = email;
		this.password = password;
		this.username = username;
		this.IdCard = IdCard;
	}

	public Investor(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public Investor(String uid, String email, String password, String username,
			String IdCard) {
		this.uid = uid;
		this.email = email;
		this.password = password;
		this.username = username;
		this.IdCard = IdCard;
	}

	public Investor(String uid, String companyName, String legalRepresentative,
			String legalRepresentativewt, String businesslicence,
			String investAddress, String companyAddress,
			String registerAddress, int registerCapital, String investFiled,
			String investStage, int investCycle, String headquartersAddress) {
		this.companyName = companyName;
		this.legalRepresentative = legalRepresentative;
		this.legalRepresentativewt = legalRepresentativewt;
		this.businesslicence = businesslicence;
		this.investAddress = investAddress;
		this.companyAddress = companyAddress;
		this.registerAddress = registerAddress;
		this.investFiled = investFiled;
		this.investStage = investStage;
		this.investCycle = investCycle;
		this.headquartersAddress = headquartersAddress;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setIdCard(String IdCard) {
		this.IdCard = IdCard;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setLegalRepresentative(String legalRep) {
		this.legalRepresentative = legalRep;
	}

	public void setLegalRepOther(String legalRepOther) {
		this.legalRepresentativewt = legalRepOther;
	}

	public void setBusinesslicence(String businessLicence) {
		this.businesslicence = businessLicence;
	}

	public void setInvestAddress(String investorAddress) {
		this.investAddress = investorAddress;
	}

	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}

	public void setRegisterAddress(String registerAddress) {
		this.registerAddress = registerAddress;
	}

	public void setRegisterCapital(int registerCapital) {
		this.registerCapital = registerCapital;
	}

	public void setInvestFiled(String investFiled) {
		this.investFiled = investFiled;
	}

	public void setInvestStage(String investStage) {
		this.investStage = investStage;
	}

	public void setInvestCycle(int investCycle) {
		this.investCycle = investCycle;
	}

	public void setHeadquartersAddress(String headquartersAddress) {
		this.headquartersAddress = headquartersAddress;
	}

	public String getUid() {
		return this.uid;
	}

	public String getEmail() {
		return this.email;
	}

	public String getPassword() {
		return this.password;
	}

	public String getUsername() {
		return this.username;
	}

	public String getIdCard() {
		return this.IdCard;
	}

	public String getCompanyName() {
		return this.companyName;

	}

	public String getLegalRep() {
		return this.legalRepresentative;
	}

	public String getLegalRepOther() {
		return this.legalRepresentativewt;
	}

	public String getBusinessLicence() {
		return this.businesslicence;
	}

	public String getInvestAddress() {
		return this.investAddress;
	}

	public String getCompanyAddress() {
		return this.companyAddress;
	}

	public String getRegisterAddress() {
		return this.registerAddress;
	}

	public int getRegisterCapital() {
		return this.registerCapital;
	}

	public String getInvestFiled() {
		return this.investFiled;
	}

	public String getInvestStage() {
		return this.investStage;
	}

	public int getInvestCycle() {
		return this.investCycle;
	}

	public String getHeadquartersAddress() {
		return this.headquartersAddress;
	}
	
	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	
	public String getLogoUrl() {
		return this.logoUrl;
	}
}

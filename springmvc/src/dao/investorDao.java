package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

import com.itextpdf.text.List;

import model.Investor;

@SuppressWarnings("deprecation")
public class investorDao {

	private SimpleJdbcTemplate jdbcTemplate;

	private static final String SQL_INSERT = " insert into investor (email, password, username, IdCard) "
			+ " values (?, ?, ?, ?) ";

	public void setJdbcTemplate(SimpleJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void insert(Investor user) {
		jdbcTemplate.update(SQL_INSERT, user.getEmail(), user.getPassword(),
				user.getUsername(), user.getIdCard());
	}

	public void updatePassword(Investor user) {
		String sql = "update investor set password = ? where email = ?";
		jdbcTemplate.update(sql, user.getPassword(), user.getEmail());

	}

	public void update(Investor user) {
		String sql = "update investor set email = ?, password = ?, username = ?, IdCard = ? where uid = ?";

		jdbcTemplate.update(sql, user.getEmail(), user.getPassword(),
				user.getUsername(), user.getIdCard(), user.getUid());
	}

	public Investor getInvestorById(String uid) {
		String sql = "select uid, email, password, username, IdCard from investor where uid = ?";
		ArrayList<Investor> list = (ArrayList<Investor>) jdbcTemplate.query(sql, new RowMapper<Investor>() {

			@Override
			public Investor mapRow(ResultSet rs, int rowNum)
					throws SQLException {
				Investor user = new Investor();
				user.setUid(rs.getString(1));
				user.setEmail(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setUsername(rs.getString(4));
				return user;
			}
			
		}, uid);
		
		if(list.isEmpty()) {
			return null;
		}
		
		return list.get(0);
	}

	
	public Investor getInvestorByEmail(String email) {
		String sql = "select uid, email, password, username, IdCard from investor where email = ?";

		ArrayList<Investor> emailList = (ArrayList<Investor>) jdbcTemplate
				.query(sql, new RowMapper<Investor>() {
					@Override
					public Investor mapRow(ResultSet rs, int rowNum)
							throws SQLException {
						Investor user = new Investor();
						user.setUid(rs.getString(1));
						user.setEmail(rs.getString(2));
						user.setPassword(rs.getString(3));
						user.setUsername(rs.getString(4));
						return user;
					}
				}, email);

		if (emailList.isEmpty()) {
			return null;
		}

		return emailList.get(0);
	}

	public Investor getInvestorByIdCard(String IdCard) {
		String sql = "select uid, email, password, IdCard from investor where IdCard = ?";

		ArrayList<Investor> UidList = (ArrayList<Investor>) jdbcTemplate.query(sql,
				new RowMapper<Investor>() {
					public Investor mapRow(ResultSet rs, int rowNum)
							throws SQLException {
							Investor user = new Investor();
							user.setUid(rs.getString(1));
							user.setEmail(rs.getString(2));
							user.setPassword(rs.getString(3));
							user.setIdCard(rs.getString(4));
							return user;
					}
				}, IdCard);
		if(UidList.isEmpty()) {
			return null;
		}
		
		return UidList.get(0);
	}

	public void deleteInvestorById(String uid) {
		String sql = "delete from investor where uid = ?";
		jdbcTemplate.update(sql, uid);
	}

	public void updateOther(Investor user) {
		String sql = "update investor set companyName = ?, legalRepresentative = ?, "
				+ " legalRepresentativewt = ?, businesslicence = ?, investAddress = ?,companyAddress = ?, "
				+ "registerAddress = ?, investFiled = ?, investStage = ?, investCycle = ?,"
				+ " headquartersAddress = ?, logoUrl = ? where email = '" + user.getEmail() + "'";
		jdbcTemplate.update(sql, user.getCompanyName(), user.getLegalRep(),
				user.getLegalRepOther(), user.getBusinessLicence(),
				user.getInvestAddress(), user.getCompanyAddress(),
				user.getRegisterAddress(), user.getInvestFiled(),
				user.getInvestStage(), user.getInvestCycle(),
				user.getHeadquartersAddress(),user.getLogoUrl());

	}

}

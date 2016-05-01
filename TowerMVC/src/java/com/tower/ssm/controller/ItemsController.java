package com.tower.ssm.controller;

import java.io.File;
import java.util.*;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.tower.ssm.controller.exception.CustomException;
import com.tower.ssm.controller.validation.ValidateGroup1;
import com.tower.ssm.po.ItemsCustom;
import com.tower.ssm.po.ItemsQueryVo;
import com.tower.ssm.service.ItemsService;

@Controller
@RequestMapping("/items")
public class ItemsController {
	
	
	@Autowired
	private ItemsService service;
	
	@RequestMapping("/queryItems")
	public ModelAndView queryItems(HttpServletRequest req ,ItemsQueryVo itemsQueryVo)throws Exception{
		
		List<ItemsCustom> itemsList = service.findItemsList(itemsQueryVo);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("itemsList", itemsList);
		modelAndView.setViewName("items/itemsList");
		return modelAndView;
	}
	
	//查询商品信息输出json
	//itemsView/{id}里面的id表是要将这个位置的id传入到@PathVariable指定名称中
	@RequestMapping("/itemsView/{id}")
	public @ResponseBody ItemsCustom itemView(@PathVariable("id") Integer id) throws Exception{
		ItemsCustom itemsCustom = service.findItemsById(id);
		
		return itemsCustom;
	}
	
	
	//页面展示
	//@RequestMapping("/editItems")
	//限制http请求
	@RequestMapping(value="editItems",method={RequestMethod.POST,RequestMethod.GET})
	public String editItems(Model model,@RequestParam(value="id",required=true) Integer items_id)throws Exception{
		
		ItemsCustom itemsCustom = service.findItemsById(items_id);
		if (itemsCustom==null) {
			throw new CustomException("商品不存在");
		}
		
		model.addAttribute("items",itemsCustom);
//		ModelAndView modelAndView = new ModelAndView();
//		modelAndView.addObject("itemsCustom", itemsCustom);
//		modelAndView.setViewName("items/editItems");
//		return modelAndView;
		return "items/editItems";
	}

	@RequestMapping("/addItems")
	public String addItems(Model model){
		return "items/addItems";
	}

	//实际添加
	@RequestMapping(value = "/addItems/addItemsP" ,method = RequestMethod.POST)
	public String addItemsP(Model model,ItemsCustom itemsCustom) throws Exception {
		itemsCustom.setCreatetime(new Date());
		service.addItems(itemsCustom);
		return "redirect:/items/queryItems";
	}

	@RequestMapping(value = "/itemDetail/{id}",method = RequestMethod.GET)
	public String itemDetail(Model model ,@PathVariable ("id") Integer item_id)throws Exception{
		ItemsCustom itemsCustom = service.findItemsById(item_id);
		model.addAttribute("item",itemsCustom);

		return "items/itemDetail";
	}


	//提交
	//在需要校验的pojo前加@Validated 在需要校验的pojo后加BindingResult
	//成对出现：@Validate 以及BindingResult
	//指定校验分组1
	//modelAttribute可以指定pojo在request中的key,回显
	@RequestMapping("/editItemsSubmit")
	public String editItemsSubmit(Model model,Integer id,
//			@ModelAttribute("items")@Validated(value={ValidateGroup1.class}) ItemsCustom itemCustom,BindingResult bindResult)throws Exception{
			@Validated(value={ValidateGroup1.class}) ItemsCustom itemCustom,
			BindingResult bindResult,
			MultipartFile items_pic//接受商品图片
			)throws Exception{
		
		
		//获取校验错误信息
		if(bindResult.hasErrors()){
			List<ObjectError> allErrorss = bindResult.getAllErrors();
			List<String> allErrors = new ArrayList<String>();
			for(ObjectError obj :allErrorss){
				System.out.println(new String(obj.getDefaultMessage().getBytes("ISO8859-1"),"UTF-8"));
				allErrors.add(new String(obj.getDefaultMessage().getBytes("ISO8859-1"),"UTF-8"));
			}
			model.addAttribute("allErrors",allErrors);
			model.addAttribute("items",itemCustom);
//			return "forward:/items/editItems.action";//转发重定向一定要.action结尾，前面要/开头
			return "items/editItems";
		}
		//原始名称
		String originalFilename = items_pic.getOriginalFilename();
		//上传图片
		if (items_pic!=null && originalFilename!=null&&originalFilename.length()>0) {
			//存储图片的物理路径
			String pic_path = "D:\\SpringUpload";

			//新图片的名称
			String newFileName = UUID.randomUUID() +originalFilename.substring(originalFilename.lastIndexOf("."));
			//新图片
			File newfile = new File(pic_path+"\\"+newFileName);
			//将内存中的数据写进磁盘
			items_pic.transferTo(newfile);
			//将新图片写入custom
			itemCustom.setPic(newFileName);
			
			
		}else{
			throw new CustomException("图片为空");
		}
		
		service.updateItems(id, itemCustom);
		
//		ModelAndView modelAndView = new ModelAndView();
//		modelAndView.addObject("itemsList", itemsList);
//		
//		modelAndView.setViewName("items/itemsList");
//		return modelAndView;
		return "redirect:queryItems.action";
//		return "Success";
		
	}
	
	@RequestMapping("/deleteItems")
	public String deleteItems(Integer[] items_id)throws Exception{
		
		service.deleteItems(items_id);
		
		return "redirect:/items/queryItems";
	}
	
	
	@RequestMapping("/editItemsQuery")
	public ModelAndView editItemsQuery(HttpServletRequest req ,ItemsQueryVo itemsQueryVo)throws Exception{
		
		List<ItemsCustom> itemsCustomList = service.findItemsList(itemsQueryVo);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("itemsCustomList", itemsCustomList);
		modelAndView.addObject("itemInfo", itemsQueryVo.getItemInfo());
		modelAndView.setViewName("items/editItemsQuery");
		return modelAndView;
	}
	
	@RequestMapping("/updateItems")
	public String updateItems(ItemsQueryVo itemsQueryVo) throws Exception{
		List<ItemsCustom> itemsCustomList = service.findItemsList(itemsQueryVo);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("itemsCustomList", itemsCustomList);
		modelAndView.addObject("itemInfo", itemsQueryVo.getItemInfo());
		modelAndView.setViewName("items/editItemsQuery");
		
		return "forward:/items/editItemsQuery.action";
	}
	
	@ModelAttribute("itemtypes")
	public Map<String,String> getItemTypes(){
		Map<String,String> itemtypes = new HashMap<String, String>();
		
		itemtypes.put("101", "数码");
		itemtypes.put("102", "母婴");
		return itemtypes;
	}
}

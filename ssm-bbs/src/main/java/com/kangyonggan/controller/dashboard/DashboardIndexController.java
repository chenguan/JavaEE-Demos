package com.kangyonggan.controller.dashboard;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author kangyonggan
 * @since 16/4/29
 */
@Controller
@RequestMapping("dashboard")
public class DashboardIndexController {

    private static final String PATH_ROOT = "dashboard/index";
    private static final String PATH_INDEX = PATH_ROOT + "/index";

    @RequestMapping
    public String index(Model model) {
        return PATH_INDEX;
    }

}

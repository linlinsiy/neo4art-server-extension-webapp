package it.inserpio.neo4art.controller;

import it.inserpio.neo4art.model.User;
import it.inserpio.neo4art.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

/**
 * Created by lsy on 2017/6/23.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/setup",method = RequestMethod.GET)
    @ResponseBody
    public String setup(){
        userService.setUpUsers();
        return "添加成功";
    }

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    /**
     * 清理数据库
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/clear",method = RequestMethod.GET)
    public String clear(){
        userService.purgeDatabase();
        return "删除成功";
    }

    @ResponseBody
    @RequestMapping(value = "/graph",method = RequestMethod.GET,produces="application/json")
    public Map<String,Object> graph(@RequestParam(value = "limit",required = false) Integer limit){
        return userService.graph(limit == null ? 6 : limit);
    }

    /**
     * 根据姓名查找相关朋友
     */
    @ResponseBody
    @RequestMapping(value = "/searchFriendsByTitle",method = RequestMethod.GET)
    public Map<String, Object> searchFriendsByTitle(String userName){
        return userService.searchFriends(userName);
    }

    @ResponseBody
    @RequestMapping(value = "/getFriendOfFriend/{name}",method = RequestMethod.GET,produces = "application/json")
    public Set<User> getFriendOfFriend(@PathVariable("name") String name){
        return userService.getFriendOfFriend(name);
    }
}

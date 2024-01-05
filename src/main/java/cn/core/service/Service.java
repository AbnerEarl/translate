package cn.core.service;

import cn.core.util.ConsoleUtil;

/**
 * 翻译服务核心
 * @author Frank
 */
public class Service{
	//当前使用的翻译服务，使用时请用 getService() 获取
	public static ServiceInterface serviceInterface;
	
	/**
	 * 获取当前使用的翻译服务
	 * @return
	 */
	public static ServiceInterface getService() {
		if(serviceInterface == null) {
			System.err.println("cn.core.service.serviceInterface 尚未初始化，请检查是否加入了 tcdn.service 服务");
		}
		return serviceInterface;
	}
}

package cn.core.vo;

import java.util.List;
import com.xnx3.BaseVO;

import cn.core.vo.bean.LanguageBean;

/**
 * 语言列表，服务于 language.json
 * @author Frank
 *
 */
public class LanguageListVO extends BaseVO{
	private List<LanguageBean> list; //支持的语言列表

	public List<LanguageBean> getList() {
		return list;
	}

	public void setList(List<LanguageBean> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "LanguageVO [list=" + list + ", getResult()=" + getResult() + ", getInfo()=" + getInfo() + "]";
	}
	
}

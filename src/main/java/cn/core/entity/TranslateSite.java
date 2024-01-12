package cn.core.entity;

import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * 翻译的站点
 * @author <a href="https://github.com/AbnerEarl/translate/writecode">WriteCode自动生成</a>
 */
@Entity()
@Table(name = "translate_site", indexes={@Index(name="suoyin_index",columnList="userid,name,language")})
public class TranslateSite implements java.io.Serializable{


	private Integer id;	//主键,自动编号 
	private String name;	//站点名字，只是给自己看的，方便辨别 
	private String language;	//当前语种，当前站点的语种是什么，如 english ，跟 http://localhost:8060/doc/language.json.html 这里的值对应
	private String url;	//站点网址，格式如 www.zvo.cn 
	private Integer userid;	//此条记录属于哪个用户,user.id
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", columnDefinition="int(11) COMMENT '主键,自动编号'")
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(name = "name", columnDefinition="char(20) COMMENT '站点名字，只是给自己看的，方便辨别'")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "language", columnDefinition="char(30) COMMENT '当前语种，当前站点的语种是什么，如 english ，跟 http://localhost:8060/doc/language.json.html 这里的值对应'")
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	@Column(name = "url", columnDefinition="char(50) COMMENT '站点网址，格式如 www.zvo.cn '")
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	@Column(name = "userid", columnDefinition="int(11) COMMENT '此条记录属于哪个用户,user.id'")
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	@Override
	public String toString() {
		return "{id : "+this.id+", name : "+this.name+", language : "+this.language+", url : "+this.url+"}";
	}
}
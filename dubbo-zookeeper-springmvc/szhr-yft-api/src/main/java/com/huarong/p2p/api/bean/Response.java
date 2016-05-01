package com.huarong.p2p.api.bean;

/**
 * 响应对象
 *
 * @author he
 * @since 1.0.0
 */
public class Response {
	
	private final static String CODE_ERROR="00";
	private final static String CODE_SUCCESS="01";

    private Meta meta;
    private Object data;
    
    public Response failure(String message){
    	this.meta = new Meta(CODE_ERROR, message);
    	this.data = null;
    	return this;
    }
    
    
    public Response success(Object data){
    	this.meta = new Meta(CODE_SUCCESS,"success");
    	this.data = data;
    	return this;
    }
    
    public Response success(Object data,String message){
    	this.meta = new Meta(CODE_SUCCESS,"success");
    	this.data = data;
    	return this;
    }
    
    public Response success(){
    	this.meta = new Meta("01","success");
    	return this;
    }

    public void setMeta(Meta meta) {
		this.meta = meta;
	}

	public Meta getMeta() {
        return meta;
    }

    public Object getData() {
        return data;
    }
    
    public void setData(Object data) {
		this.data = data;
	}
    
    public class Meta {

        private String code;
        private String message;

        public Meta(String code) {
            this.code = code;
        }

        public Meta(String code, String message) {
            this.code = code;
            this.message = message;
        }

		public String getCode() {
			return code;
		}

		public void setCode(String code) {
			this.code = code;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

       
    }
}

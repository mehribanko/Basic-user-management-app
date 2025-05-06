export interface ApiResponseMeta {
  code: number;       
  message: string;   
}

export interface UserListItem {
  seq_no: string;  
  id: string;           
  name: string;        
  job_rank: string;     
  position: string;    
  email: string;        
  active: boolean;     
}

export interface UserListData {
  page_index: number;  
  page_size: number;    
  total_count: number;  
  result_list: UserListItem[];
}


export interface UserListApiResponse {
  meta: ApiResponseMeta;
  data: UserListData;
}

export interface UserDetailData {
  seq_no: string;       
  id: string;           
  name: string;         
  job_rank: string;     
  position: string;     
  email: string;        
  ip_address: string;   
  active: boolean;     
  join_date: string;    
}

export interface UserDetailApiResponse {
  meta: ApiResponseMeta;
  data: UserDetailData;
}

export interface UpdateUserData {
  name: string;
  job_rank: string;
  position: string;
  email: string;
  ip_address: string;
  active: boolean;
  join_date: string; 
}

export interface UserMutationApiResponse {
   meta: ApiResponseMeta;
   data?: null; 
}

export type GetUsersParams = {
  page_index: number;
  page_size: number;
  id?: string;
  name?: string;
  email?: string;
  active?: boolean | '';
};

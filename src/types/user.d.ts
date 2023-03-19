declare interface UserInfo {
  account: string //登录账号
  channel: '1' | '2' //注册渠道;1、创富2、掌沃通
  channelCode: 'GD-CF'
  channelName: string | null
  createBy: string | null
  createTime: number
  delFlag: '0' | '1' //删除状态;0，正常，1已删除
  exceptionTime: string | null
  idNumber: string | null
  managerId: string | null
  password: string
  phone: string | null
  realname: string | null
  regionName: string | null
  regionNo: string | null
  salt: string
  status: 1
  updateBy: string | null
  updateTime: string | null
  wealthUserId: string
  zwtNo: string | null
  starLevel: number //星级
}

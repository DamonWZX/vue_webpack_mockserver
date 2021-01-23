import ajax from '@/utils/ajax'

// 查询 AgentsList
export function queryAgentsList (payload) {
  return ajax.get(`agents`, payload)
}

// 更新 Agent
export function updateAgent (payload) {
  return ajax.put(`agents/${payload.id}`, payload)
}

// 新增 Agent
export function addAgent (payload) {
  return ajax.post(`agents`, payload)
}

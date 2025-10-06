# 部署架構設計

## 📋 部署概述

Project-Build 系統採用容器化部署，基於 Kubernetes 進行編排管理。

### 🎯 部署目標
- 支持多環境部署
- 實現自動化部署
- 保證高可用性
- 支持彈性擴展
- 提供監控告警

## 🏗️ 部署架構

### 部署環境
- **開發環境**: 開發測試
- **測試環境**: 功能測試
- **預發布環境**: 生產前測試
- **生產環境**: 正式運行

### 部署架構圖
```
┌─────────────────────────────────────────────────────────────┐
│                    部署架構圖                               │
├─────────────────────────────────────────────────────────────┤
│  負載均衡層                                                  │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │   Nginx     │   Kong      │   HAProxy   │   F5        │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Kubernetes 集群                                             │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │  Master     │  Node 1     │  Node 2     │  Node 3     │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  應用服務層                                                  │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │  Frontend   │  API Gateway│  Microservices│  Database  │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  數據存儲層                                                  │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │ PostgreSQL  │   Redis     │  MongoDB    │  MinIO      │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 容器化設計

### Docker 鏡像
```dockerfile
# 前端鏡像
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 後端鏡像
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes 配置
```yaml
# 前端部署
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: project-build/frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"

---
# 服務配置
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## 🚀 部署策略

### 藍綠部署
- **藍環境**: 當前生產環境
- **綠環境**: 新版本環境
- **切換**: 一鍵切換
- **回滾**: 快速回滾

### 滾動更新
- **分批更新**: 分批更新實例
- **健康檢查**: 更新後健康檢查
- **自動回滾**: 失敗自動回滾
- **零停機**: 零停機更新

### 金絲雀部署
- **小流量**: 小部分流量
- **監控**: 實時監控
- **逐步擴大**: 逐步擴大流量
- **全量發布**: 確認無問題後全量

## 📊 配置管理

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://user:pass@db:5432/db"
  redis_url: "redis://redis:6379"
  api_base_url: "https://api.project-build.com"
```

### Secret
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  database_password: <base64-encoded-password>
  jwt_secret: <base64-encoded-secret>
  api_key: <base64-encoded-key>
```

## 🔐 安全配置

### 網絡策略
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: nginx
    ports:
    - protocol: TCP
      port: 80
```

### RBAC 配置
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "watch"]
```

## 📈 監控配置

### Prometheus 配置
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
```

### Grafana 儀表板
- **系統監控**: CPU、內存、磁盤
- **應用監控**: 響應時間、錯誤率
- **業務監控**: 用戶數、請求數
- **告警配置**: 異常告警

## 🔄 CI/CD 流程

### GitLab CI 配置
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

test:
  stage: test
  script:
    - npm run test
    - npm run e2e

deploy:
  stage: deploy
  script:
    - kubectl set image deployment/frontend frontend=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/frontend
```

### Jenkins 配置
- **觸發器**: Git 提交觸發
- **構建**: Docker 鏡像構建
- **測試**: 自動化測試
- **部署**: 自動部署

## 📊 日誌管理

### ELK Stack
- **Elasticsearch**: 日誌存儲
- **Logstash**: 日誌處理
- **Kibana**: 日誌可視化
- **Filebeat**: 日誌收集

### 日誌配置
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: logstash-config
data:
  logstash.conf: |
    input {
      beats {
        port => 5044
      }
    }
    filter {
      if [fields][service] == "frontend" {
        mutate {
          add_field => { "service_type" => "frontend" }
        }
      }
    }
    output {
      elasticsearch {
        hosts => ["elasticsearch:9200"]
      }
    }
```

## 🔄 備份恢復

### 數據備份
- **數據庫備份**: 每日全量備份
- **文件備份**: 實時同步備份
- **配置備份**: 版本控制備份
- **鏡像備份**: 鏡像倉庫備份

### 災難恢復
- **RTO**: 恢復時間目標 < 4 小時
- **RPO**: 恢復點目標 < 1 小時
- **異地備份**: 異地災備
- **恢復測試**: 定期恢復測試

---

**📋 部署架構檢查清單**
- [ ] 部署環境設計完成
- [ ] 容器化設計完成
- [ ] Kubernetes 配置完成
- [ ] 部署策略設計完成
- [ ] 配置管理完成
- [ ] 安全配置完成
- [ ] 監控配置完成
- [ ] CI/CD 流程完成
- [ ] 日誌管理完成
- [ ] 備份恢復完成
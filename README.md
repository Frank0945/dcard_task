## Dcard 2023 Frontend Intern Homework

於本地端執行：
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

https://dcard-task.vercel.app/

## Folder Structure

```bash
dcard_task/
  components/                # 組件目錄
  filters/                   # 存放各種資料篩選、排序、格式化的函數
  pages/                     # Next.js 頁面目錄
    api/                     # 存放後端API檔案
  services/                  # 存放與後端互動的程式碼，包括各種API請求、回應
    ...
    dialogService.ts         # 控制各式彈出視窗的接口
    serverServices.ts        # 與後端各類功能交互的接口
    taskServices.ts          # Task透過Github API的各種功能
  styles/                    # 存放CSS樣式檔案
  types/                     # 存放類型定義檔案，如interfaces
  ...
  .env.local                 # 環境檔，用於儲存不公開的敏感資料
```

## Packages

```bash
bootstrap            # 用於幫助前端框架建置
bootstrap-icons      # 介面中Icons來源
axios                # 用於處理HTTP請求
next-auth            # 用於進行Github OAuth的身份驗證
```

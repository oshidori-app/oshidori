# API

## 初期設定

**2017/11/19 現在、windows環境だとdockerを利用したaws sam localの利用が不安定でバグもあるため、mac環境推奨です**

### 参考URL
```
https://github.com/awslabs/aws-sam-local
```

1. docker環境の構築（参考URL参照）
2. aws-sam-localのインストール
```
npm install -g aws-sam-local
```

## フォルダ構成

### swagger
swaggerの定義ファイルを配置する。  
当定義ファイルをから以下を作成する。
* 設計ドキュメント（HTML）
* クライアント側SDK
* AWS API Gateway定義

### lambda
AWS lambdaの実体ソース。

### sam
* AWS Serverless Application Model.  
* lambdaはCloudformationで作成し、Infrastructure as Code にするといい感じだが、API GatewayやDB、IAM認証との紐付けなど、結構コード化するのが大変。
SAMを利用するとCloudformationを簡略化した文法で記述することができる。
* sam localはserverlessなAWSバックエンドを効率的に開発するための開発、テスト、デプロイを支援するツール。awsに特化した(awsの)serverless frameworkみたいな感じ。
* swaggerの定義ファイルおよび、lambdaのソースファイルをSAMから参照するようにする


## 利用例

```sh
# samのテンプレートファイル、アップロードするS3を指定して、デプロイ用の定義ファイルを作成
sam package --template-file template.yaml --s3-bucket oshidori-dev-hosting --output-template-file packaged-template.yaml

# デプロイ用の定義ファイル、CloudFormationのスタック名を任意に指定し、AWSにデプロイする
# 事前にlambdaファイルはzipでS3にアップロードする必要がある
sam deploy --template-file ./packaged-template.yaml --stack-name sam-dev --capabilities CAPABILITY_IAM
```








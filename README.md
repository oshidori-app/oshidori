oshidoriアプリのリポジトリです。

## 動かす


1. アプリケーションの起動

   ```bash
   $ cd app
   $ npm install -g ionic cordova
   $ ionic serve
   ```

## コードの静的解析
tslintというtypescriptのコードを静的解析するツールを入れています。
ローカルで確認するのは下記コマンドを実行してください。※CIでも実行されます。

```
$ npm run lint
```

## Dockerで環境を立ち上げる

dockerコンテナで環境立ち上がるようにしました。
※Docker for Macでしか動作確認出来てないです(；・∀・)

### 開発環境の構築
下記内容で任意のディレクトリに`Dockerfile`を作成

``` docker
FROM beevelop/ionic:latest
ENV WORK_DIR /work
RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}
```

上記ファイルを作成後、下記コマンドを実行すると開発用のコンテナを起動し、コンソールを起動することが出来ます。
``` bash
$ docker build -t ionic-work .
# `/Users/hoge.fuga/Documents/repo/ionic/work`は適宜変える
$ docker run -v /Users/hoge.fuga/Documents/repo/ionic/work:/work -p 8100:8100 -d -it --name ionic-work ionic-work
$ docker exec -it ionic-work bash
```

コンテナ上の`/work`に作業用ディレクトリがマウントされて、ionicの開発環境が立ち上がります。

### アプリの起動

```
$ cd アプリのルートディレクトリ
$ ionic serve
```
`http://localhost:8100/`をブラウザで開くとアプリが起動しているはずです。


## エミュレータ・実機実行

プラグインのインストールが必要なので、以下を実行。
```
cordova prepare
```

### ios

```
npm -g install ios-deploy
```


```
// 実機(初回はXcodeを起動してsigningする必要あり)
ionic cordova run ios -l -c --device -- --buildFlag="-UseModernBuildSystem=0"

// Emulator
ionic cordova run ios -l -c -- --buildFlag="-UseModernBuildSystem=0"
```

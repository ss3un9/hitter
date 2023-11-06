#  HITTER: 음원산업관계자를 위한 히트곡 예측 웹 서비스
![logo](https://user-images.githubusercontent.com/101931446/250477260-1fb0d678-ca39-4ecb-8ae5-91b4df1e7411.png)   

전 세계 디지털 음악 시장의 가치는 약 213달러에 달합니다. 
음악 시장에서는 인공지능(AI) 기술을 활용하여 여러 분야에서 음원 데이터를 분석하고 활용하고 있습니다.  예를 들어 AI를 사용하여 히트곡의 패턴을 학습하거나 음악 자동 Tagging, 작곡 등의 작업을 수행합니다.
세계 최대 음원 스트리밍 서비스 "Spotify"도 인공지능을 활용하여 뮤지컬이나 팟캐스트의 주제와 형식을 예측한 경험이 있습니다.  또한, 세계 최대 음원 공유 플랫폼 "Sound Cloud"에서는 히트곡 예측 기술을 활용 전망을 발표한 바 있습니다. 

이러한 배경에서 음원 빅데이터를 활용하여 AI 기반 히트 곡 예측 서비스를 개발하려는 목적이 생겼습니다. 이 서비스는 음악 산업의 다양한 관계자들(레코드 회사, 아티스트, 음악 프로듀서 등)이 효과적인 마케팅 전략을 수립하는 데 도움을 주고, 음악 시장을 활성화시키며, 사용자들에게 음악과 음악 산업의 트렌드를 빠르게 이해할 수 있도록 도움을 줄 것입니다.
       

# 목차
1. [프로젝트 설명](#프로젝트-설명)
2. [프로젝트 구조](#프로젝트-구조)
3. [기능](#기능)
4. [팀원](#팀원)




## 프로젝트 설명 

### 서비스 플로우
카카오 멜론에서 제공하는 [멜론 플레이리스트 데이터셋](https://arena.kakao.com/c/7/data)을 딥러닝 모델에 학습시켜 곡의 히트 확률을 예측합니다.
  1. 사용자가 업로드 할 음원의 장르(**POP / BALLAD / DANCE**)를 선택합니다.
  2. 음원 데이터와 가사 데이터를 **업로드** 합니다.
  3. 서버에 탑재된 **딥러닝 모델**에 input data로 들어가게 됩니다.
  4. **예측된 히트 점수**를 불러와 결과 화면으로 보여줍니다.

### 예측 원리
- 우리는 **Mel-Spectrogram** 이라는 데이터 형식을 사용합니다.
  - 사람이 더 높은 주파수 영역에서는 더 적은 세부 정보를 인식하는 경향등을 반영하여 사람의 청각시스템을 모사한 데이터라고 할 수 있습니다.
  - 2D 이미지와 같은 형태로 표현되기 때문에, CNN과 같은 딥러닝 기술에도 쉽게 적용 가능합니다.
- 즉, 원본 오디오 데이터에서 특성 추출을 효율적으로 함과 동시에 표준화된 입력 형태로 학습 성능 또한 향상시킬 수 있습니다.
1. **음원 데이터 학습 모델**
   - 20~50초 사이의 음원 파일 데이터를 사용했습니다.
   - 각 장르 별로 히트와 비히트가 전처리된 데이터로 모델 학습을 진행합니다.
   - 1DCNN, 2DCNN, LSTM, RCNN 모델을 시도했고, 정확도가 가장 높은 1DCNN 모델을 최종 선정하였습니다.
2. **가사 데이터 학습 모델**
   - 음원 데이터 만으로는 예측 결과에 의구심이 든다는 피드백을 반영하여 진행하였습니다.
   - 음원 별 가사 데이터를 크롤링을 통해 수집하였습니다.
   - 단어 빈도 분석, 불용어 제거, 토큰화 등의 전처리를 수행하였습니다.
   - 단어에서 벡터로 바꾸는 임베딩 작업을 작업을 진행하였습니다.
   - 1DCNN, RNN, LSTM, 양방향LSTM의 모델을 실험한 결과, 정확도가 가장 높은 1DCNN 모델을 최종 선정하였습니다.                                        




## 프로젝트 구조

- **사용 스택**
  - Front : react
  - Back : java spring, fast api, AWS EC2
  - AI : Tensorflow


- **프로젝트 구조**
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/aecad056-4f27-4bce-b68c-5e9e9d36c5e4)
- **데이터 베이스 구조**
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/c70d8781-de10-41f8-a3fb-5a5615e44dbd)
- 비밀번호 암호화 
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/0bdec96c-9226-4fcb-a7b5-32e498cc848b)


## 기능
  1. [회원 가입 및 로그인 서비스]
  2. [마이페이지]
  3. [음원 파일 분석 통한 히트 확률 제공 서비스]
  4. [사용자 커뮤니티 서비스]         


**프로젝트 시연영상 - [시연영상 바로가기](https://drive.google.com/file/d/1nSPWpn9di7T_FqSeIo12CDfgFaA7wWBA/view?usp=drive_link)**

-메인 페이지
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/8bb66a7c-87e7-4b08-81f7-9f216d14f33b)

- 로그인 및 회원가입
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/20084b97-c3e6-4947-892c-ea36145c5cc9)

- 마이페이지
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/0cd1ec50-fca2-4157-9a0f-2029bd1fbae4)
- 마이페이지( 회원 정보 수정하기)
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/3b15dfbe-26e6-40b7-8d26-5d9d7d4edb93)
- 마이페이지(내가 올린 글 조회하기)
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/27fd3941-c087-4614-aa63-5207b38a2183)

- 마이페이지(내가 올린 곡 조회하기)
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/a2212433-de7c-4797-985d-ef77642c0104)

- 히트곡 예측 페이지
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/69530ee2-fcc6-49ba-98ce-5eb41b1080cd)

- 리더보드 
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/bf3d9ec3-9ad0-433f-9d9c-8a5552a00940)

- 커뮤니티
![image](https://github.com/stelladream1/HITTER-project/assets/74993171/df6c4b5f-735a-4cd3-863d-5748b83eb541)


## 팀원
해당 프로젝트는 2023.05.20 ~ 2023.07.06 동안 6인 1조로 진행되었습니다.  

김누리
  - 역할: Figma 및 산출물 작성
  - github: https://github.com/knurii

김석원
  - 역할: Figma 및 산출물 작성
  - github: https://github.com/wontwotwo

김예원

  - 역할: UI/UX 디자인, AI 모델링
  - github: https://github.com/gingerbon

김현
  - 역할: Backend, Frontend
  - github: https://github.com/stelladream1

박승현
  - 역할: Backend, Frontend
  - github: https://github.com/ss3un9

조영준
  - 역할: AI 모델링
  - Email: j00jun924@gmail.com

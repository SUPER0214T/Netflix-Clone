# NETFLIX CLONE CODING

## [해당 프로젝트 주소](https://super0214t.github.io/Netflix-Clone/#)

## 목적

- 다섯 가지의 React Library를 사용해서 NETFLIX를 따라 만들 것입니다.
- NETFLIX를 만들면서 라이브러리 사용법 복습과 포트폴리오를 제작하기 위해 이 프로젝트를 계획하였습니다.

## 기능

1. 영화 검색하기
2. 영화 슬라이더 구현
3. 모바일용 메뉴 tooltip
4. 영화 슬라이더에 있는 영화 클릭 시 영화 정보 모달이 등장합니다.
5. 영화 개봉일, 설명, 장르와 미리 보기를 해당 모달에서 확인할 수 있습니다.
6. 미리 보기 영상이 없는 경우 회차 목록에 "목록이 없습니다."가 표시됩니다.
7. 영화 목록에서 영화를 클릭 시 해당 영상의 미리 보기 영상이 열립니다.

## 사용한 React 라이브러리

- [React Query](https://react-query.tanstack.com/)
- [Recoil](https://recoiljs.org/ko/)
- [styled components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)

## 제작 기간

> 22.01.16 ~ 22.01.23

# Refactoring

## 디렉토리 재설정

- 한 번만 사용되는 Custom Hooks는 사용하는 컴포넌트 폴더의 hooks폴더 안에 보관

- 두 번 이상 사용되는 Custom Hooks는 src/hooks 폴더 안에 보관

- 두 번 이상 사용되는 컴포넌트는 src/Components/common 폴더 안에 보관

- 컴포넌트의 styled-components를 styles.ts 파일로 분리

> 좌: 디렉토리 재설정 전

> 우: 디렉토리 재설정 후

![디렉토리 재설정 전](https://user-images.githubusercontent.com/83449231/158019370-ae95398e-789d-466a-9e1a-f8f378b981d1.png)
![디렉토리 재설정 후](https://user-images.githubusercontent.com/83449231/158019504-ff237a5f-deb6-4cc3-86d8-6427b247dddb.png)

### Custom Hooks

- useMovieData: 영화 정보만 필요할 때

- useMovieDataStandard: 영화 정보와 로딩 정보가 필요할 때

- useWindowResize: 창의 크기가 변경될 때마다 Slider의 영화 개수를 설정

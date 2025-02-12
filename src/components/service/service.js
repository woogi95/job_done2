import styled from "@emotion/styled";

// 서브페이지 - 탑
export const PageTopDiv = styled.div`
  height: 320px;
  background-color: rgb(245, 245, 245);
  background-color: #e8faff;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    span {
      display: block;
      text-align: center;
      color: #3887ff;
      margin-top: 2px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1px;
      svg {
        font-size: 10px;
      }
    }

    ul {
      /* border: 1px solid #eee; */
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 28px 0 14px;
      button {
        background-color: #eee;
        padding: 10px 12px;
        min-width: 100px;
        display: block;
        border-radius: 20px;
        color: #555;
      }
      li button.active {
        background-color: #35c5f0;
        color: #fff;
        font-weight: 700;
        text-shadow: 1px 1px 1px #35c5f0;
      }
    }
    .search {
      /* border: 1px solid #000; */
      width: 100%;
      position: relative;
      margin-top: 5px;
      height: 40px;
      button.search-btn {
        transition: all.3s;
        &:hover {
          background-color: rgb(39, 105, 204);
        }
      }
      em {
        position: absolute;
        width: 40px;
        height: 14px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        font-size: 24px;
        color: #35c5f0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 2px solid #35c5f050;
        z-index: 2;
      }
      input {
        width: calc(100% - 120px);
        height: 40px;
        position: absolute;
        left: -1px;
        text-indent: 50px;
        border-radius: 4px;
        color: #555;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
      }
      input::placeholder {
        color: #bbb;
      }
      button {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 40px;
        height: 40px;
        background-color: #3887ff;
        color: #fff;
      }
    }
  }

  .skyblue {
    background-color: skyblue;
  }

  .yellow {
    background-color: yellow;
  }

  .pink {
    background-color: pink;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  height: 42px;
  .select {
    height: 100%;
    min-width: 145px;
    border-radius: 30px;
    background-color: #323232;
    padding: 7px 16px 9px;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: absolute;
  }
  .options {
    position: absolute;
    top: 45px;
    right: 0;
    border-radius: 3px;

    min-width: 145px;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);

    div {
      padding: 7px 16px 9px;
      cursor: pointer;
      background-color: #eee;
      transition: all 0.1s;
      &:hover {
        background-color: #323232;
        color: #fff;
      }
    }
  }
`;

// 서비스 리스트 아이템
export const ListItemDiv = styled.div`
  transition: all 0.3s;
  transform: scale(1);
  &:hover {
    transform: scale(1.01);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  /* border: 1px solid #eee; */
  width: calc((100% - 60px) / 4);
  cursor: pointer;

  /* width: 265px; */
  overflow: hidden;
  border-radius: 8px;
  .thum {
    width: 100%;
    height: 265px;
    background-color: #eee;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 60px;
      position: absolute;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0%,
        rgba(49, 49, 49, 0.5)
      );
      top: 0;
      left: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .like svg {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    color: red;
    cursor: pointer;
    z-index: 2;
  }

  .info {
    padding: 5px;
    background: rgb(248, 248, 248);
    > em {
      font-size: 14px;
      color: #777;
      display: block;
      padding: 3px 0;
    }
    h4 {
      font-size: 16px;
      color: #111;
      height: 38.41px;
      line-height: 1.2em;
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 24px;
      color: #2563eb;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
  .countStar {
    display: flex;
    gap: 1px;
    align-items: center;
    font-weight: 600;
    svg {
      font-size: 14px;
      color: #ff9d00;
    }
    em {
      font-size: 14px;
      color: #333;
    }
    span {
      font-size: 13px;
      color: #bbb;
      font-weight: 500;
    }
  }
`;

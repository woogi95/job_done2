import styled from "@emotion/styled";

export const SideMenuDiv = styled.div`
  /* border: 1px solid; */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .userhome {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    background-color: #1d4c9e;
    color: rgba(255, 255, 255, 0.6);
    .logo {
      height: 40px;
      width: 50px;
      opacity: 0.7;
      background: url(/images/logo.svg) no-repeat center center / contain;
    }
  }

  /* 메뉴 */
  > ul {
    > li {
      display: flex;
      align-items: center;
      > a {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.65);
        width: 100%;
        height: 45px;
        padding: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    li a.active,
    li a.active + ul li a.active {
      color: #fff;
    }

    .menu1 {
      align-items: start;
      flex-direction: column;
      > a {
        justify-content: space-between;
        svg {
          transition: all 0.3s ease;
          font-size: 20px;
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
        background-color: #1d4c9e;
        box-shadow:
          rgba(10, 0, 65, 0.12) 3px 3px 6px 0px inset,
          rgba(0, 0, 0, 0.04) -3px -3px 6px 1px inset;

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;

          a {
            display: flex;
            align-items: center;
            width: 100%;
            height: 45px;
            color: #fff;
            padding: 0px 40px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.65);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            /* border: 1px solid #fff; */
          }
        }
      }
      ul.sub-menu.open {
        max-height: 90px;
      }
    }
  }
`;

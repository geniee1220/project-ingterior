import styled from 'styled-components';
import { theme } from '@assets/styles/theme';

export const TemplateContainer = styled.main`
  width: 100%;
  min-height: ${`calc(100% - ${theme.layoutComponent.header_height}px - ${theme.layoutComponent.footer_height}px)`};
  padding: ${theme.layoutComponent.main_template_padding}px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 56px 0;
  }

  @media (max-width: 500px) {
    min-height: ${`calc(100% - ${theme.layoutComponent.header_mobile_height}px - ${theme.layoutComponent.footer_mobile_height}px)`};
    padding: 16px 0;
  }
`;

export const TemplateInner = styled.section`
  width: 100%;
  max-width: calc(588px + 16px * 2);
  padding: 0 16px;
  margin: 0 auto;

  .mobile,
  .pad {
    display: none;
  }

  @media (max-width: 768px) {
    .pad {
      display: block;
    }
  }

  @media (max-width: 500px) {
    .mobile {
      display: block;
    }
  }
`;

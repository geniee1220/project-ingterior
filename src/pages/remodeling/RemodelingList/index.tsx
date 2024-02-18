import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRemodelingList } from './useRemodelingList';

import { RemodelingListDataModel } from '@/apis/remodeling';

import { FiPlus } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { MdInput } from 'react-icons/md';
import RemodelingListCard from '@/components/remodeling/list/RemodlingListCard';
import Button from '@/components/common/Button';

import { theme } from '@/assets/styles/theme';
import * as S from './styles';

function RemodelingList() {
  const { remodelingListData } = useRemodelingList();
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      inView
        ? setIsButtonContainerVisible(true)
        : setIsButtonContainerVisible(false);
    },
  });

  const [isButtonContainerVisible, setIsButtonContainerVisible] =
    useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <>
      <S.RemodelingListContainer>
        {remodelingListData?.map(
          (item: RemodelingListDataModel, index: number) => (
            <RemodelingListCard cardData={item} key={index} />
          )
        )}

        <div className="constructionButtonContainer" ref={ref}>
          <S.AddConstructionConatiner
            style={{
              position: isButtonContainerVisible ? 'static' : 'fixed',
            }}
          >
            {isButtonClicked && (
              <S.AddConstructionList>
                <li>
                  <Button
                    type="button"
                    size="md"
                    onClickHandler={() => console.log('click')}
                    style={{
                      borderColor: `${theme.color.primary05}`,
                      backgroundColor: `${theme.color.primary05}`,
                      boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <MdInput />
                    코드로 현장 추가
                  </Button>
                </li>
                <li>
                  <Button
                    type="button"
                    size="md"
                    onClickHandler={() => console.log('click')}
                    style={{
                      borderColor: `${theme.color.primary05}`,
                      backgroundColor: `${theme.color.primary05}`,
                      boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <FiPlus />
                    <span>새 현장 추가</span>
                  </Button>
                </li>
              </S.AddConstructionList>
            )}
            <Button
              type="button"
              size="md"
              onClickHandler={() => setIsButtonClicked(!isButtonClicked)}
            >
              {isButtonClicked ? <AiOutlineClose /> : <FiPlus />}
              현장 추가
            </Button>
          </S.AddConstructionConatiner>
        </div>
      </S.RemodelingListContainer>
    </>
  );
}

export default RemodelingList;

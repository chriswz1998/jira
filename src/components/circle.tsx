import styled from '@emotion/styled'

export const Circle = ({
  rgb,
  title,
  svg_number,
}: {
  rgb?: string
  title?: string
  svg_number?: string | number
}) => {
  return (
    <SvgContainer>
      <Svg>
        <circle
          cx="75"
          cy="75"
          r="60"
          strokeWidth="5"
          stroke="#D1D3D7"
          fill="none"
        ></circle>
        <circle
          cx="75"
          cy="75"
          r="60"
          strokeWidth="5"
          stroke="#518EFF"
          fill="none"
          transform="matrix(0,-1,1,0,0,150)"
          strokeDasharray="1069 0"
        ></circle>
      </Svg>
      <SDetail style={{ textAlign: 'center' }}>
        <SDSpan>{svg_number || '0'}</SDSpan>
        <br />
        <span style={{ color: '#6A8ABA' }}> {title || '已完成量'} </span>
      </SDetail>
    </SvgContainer>
  )
}

const SvgContainer = styled.div`
  width: 15rem;
  height: 15rem;
  position: relative;
`

const Svg = styled.svg`
  width: 15rem;
  height: 15rem;
`

const SDetail = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  line-height: 2rem;
`

const SDSpan = styled.span`
  color: #518eff;
  font-size: 3rem;
  line-height: 3rem;
  font-weight: 500;
`

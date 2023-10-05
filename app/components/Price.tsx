import { PRICE } from '@prisma/client';

const Price = ({price}:{price:PRICE}) => {

  const renderPrice=()=>{
    switch (price) {
      case 'CHEAP':
          return <><span>$$</span><span className='text-gray-400'>$$</span></>
      case 'REGULAR':
          return <><span>$$$</span><span className='text-gray-400'>$</span></>
      case 'EXPENSIVE':
          return <span>$$$$</span>
    }
  }

  return (
    <p className='flex mr-3'>{renderPrice()}</p>
  )
}

export default Price
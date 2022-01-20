import React from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useLocation} from 'react-router-dom'

function Paginate({pages, page, isAdmin = false}) {
    const {search} = useLocation()
    const keyword = search.includes('keyword') ? search.split('keyword=')[1] : ''
    return (
        pages > 1 && <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/?page=${x+1}${keyword && `&keyword=${keyword}`}`
                        : `/admin/products/?page=${x+1}${keyword && `&keyword=${keyword}`}`
                    }
                >
                    <Pagination.Item active={x + 1 === +page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate

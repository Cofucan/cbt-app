
export const textLimit = (item , limit) => {
    return item?.length > limit ? item?.slice(0, limit)+"..." : item
}
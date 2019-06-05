export default {
  listingSelector: (item,list) => {
    const cl = []
    const pos = list.indexOf(item)
    if(pos === 0) { cl.push('first') }
    else if(pos === list.length - 1) { cl.push('last') }
    if(pos % 2 === 1) { cl.push('odd') }
    else if(pos % 2 === 0) { cl.push('even') }
    return cl.join(' ')
  }
}
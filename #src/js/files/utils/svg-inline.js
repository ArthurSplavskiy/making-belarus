/*
 * Replace all SVG images with inline SVG
 */
function svgInline(){
    const svgImages = document.querySelectorAll('img[src*="svg"]')

    for(let i = 0; i < svgImages.length; i++) {
      const img = svgImages[i]
      const imgClass = img.getAttribute('class')
      const imgID = img.getAttribute('id')
      const imgURL = img.getAttribute('src')

      fetch(imgURL)
        .then((response) => {
          return response;
        })
        .then((data) => {
          console.log(data.body.getReader());
      });
    }
    


    // $('img[src*="svg"]').not('.preloader__img').each(function () {
    //   let $img = $(this),
    //     imgID = $img.attr('id'),
    //     imgClass = $img.attr('class'),
    //     imgURL = $img.attr('src');
  
    //   $.get(imgURL, function (data) {
    //     // Get the SVG tag, ignore the rest
    //     let $svg = $(data).find('svg');
    //         if ($svg) {
    //             $svg.find('path').removeAttr('style');
    //             // Remove any invalid XML tags as per http://validator.w3.org
    //             $svg.removeAttr('id x y version xmlns xml:space xmlns:a');
    //             $svg.find("style").detach();
    //             // Add replaced image ID to the new SVG
    //             if (imgID !== undefined) $svg.attr('id', imgID);
    //             // Add replaced image classes to the new SVG
    //             if (imgClass !== undefined) $svg.attr('class', 'replaced__svg ' + imgClass);
    //             else $svg.attr('class', 'replaced__svg');
    //             // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    //             /*if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
    //             $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
    //             }*/
    //             // Replace image with new SVG
    //             $img.replaceWith($svg);
    //         }
    //     }, 'xml');
    // });
}
//svgInline();
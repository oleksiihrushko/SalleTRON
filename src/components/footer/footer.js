import './footer.scss';

const footerMarkup = `
<div class="footer__info container">
<p class="footer__info-r1"> 
<span> &#169 2020</span> 
<span> 
  <svg 
      width="1px" height="12px">
      <path fill-rule="evenodd"  opacity="0.502" fill="rgb(206, 210, 209)"
      d="M1.000,20.000 L-0.000,20.000 L-0.000,-0.000 L1.000,-0.000 L1.000,20.000 Z"/>
  </svg>
</span> 
    <span class="br">All Rights Reserved</span> 
    <span> 
  <svg 
      width="1px" height="12px">
      <path fill-rule="evenodd"  opacity="0.502" fill="rgb(206, 210, 209)"
      d="M1.000,20.000 L-0.000,20.000 L-0.000,-0.000 L1.000,-0.000 L1.000,20.000 Z"/>
  </svg>
</span> 
</p>
<p class="footer__info-r1">
       <span> Developed with</span> 
       <span>
       <svg 
            width="10px" height="10px">
            <image  x="0px" y="0px" width="10px" height="10px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAjVBMVEX/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj/awj///8aahlKAAAALXRSTlMAB0BUMgZL5dAz0eRJN/nxNba08sG/XFsCxB3jHCXn6ikv7OsuKOHgGdURyxDmIhATAAAAAWJLR0QuVNMQhwAAAAd0SU1FB+QGCRElD9bhTS8AAAB5SURBVBjTZY5JFoJADAVLaBUn2gEVwVlxAHL/60kjKnnW5qdqFaDj+YYK43tdt72+iARmMKxmNIZJKA5r6wmnzEQxZ6GD/Q+RDktWOqyJN22PYkjSn6db99lu//HDkZrT+e2XKw3Zzfk948sjEHkmtMiLIkdRls3xAi93G8l+IjaCAAAAAElFTkSuQmCC" />
      </svg>
      </span> 
      <span>by</span> 
        
    <a class="footer__mailto"
        href="mailto:someone@yoursite.com">
        BootCamp20
    </a>
</p>
</div>
`;

const footer = document.querySelector('.footer');
footer.innerHTML = footerMarkup;
{
// const footerMarkup = `
// <div class="footer__nav container">
//     <p class="footer__info">
//     <span class="br">&#169 2020</span> 
//     <span class="br">All Rights Reserved</span> 
//     Developed with &#9829
//        by 
//     <a class="footer__mailto"
//     href="mailto:someone@yoursite.com">GoIT BootCamp20
//     </a>
//     </p>
// </div>
// `;
}
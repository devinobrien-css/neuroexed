export const Brain = ({ className = '' }: { className?: string }) => {
  const styles = `
    @keyframes synapseFlash {
      0% { opacity: 0.3; stroke-width: 1; }
      50% { opacity: 1; stroke-width: 1; filter: drop-shadow(0 0 1px currentColor); }
      100% { opacity: 0.3; stroke-width: 1; }
    }
    
    @keyframes neuronPulse {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 1px currentColor); }
      100% { transform: scale(1); opacity: 0.7; }
    }
    
    .synapse-path {
      animation: synapseFlash 5s ease-in-out infinite;
      stroke: #9AD4D6;
      opacity: 0.3;
    }
    
    .synapse-path:nth-child(2n) {
      animation-delay: 0.3s;
      stroke: #78A6AE;
    }
    
    .synapse-path:nth-child(3n) {
      animation-delay: 0.6s;
      stroke: #C6E9EB;
    }
    
    .synapse-path:nth-child(4n) {
      animation-delay: 0.9s;
      stroke: #557786;
    }
    
    .synapse-path:nth-child(5n) {
      animation-delay: 1.2s;
      stroke: #9AD4D6;
    }
    
    .synapse-path:nth-child(6n) {
      animation-delay: 1.5s;
      stroke: #78A6AE;
    }
    
    .neuron-node {
      fill: #101935;
      stroke: #33485E;
      opacity: 0.8;
    }
    
    .neuron-node:nth-child(2n) {
      animation-delay: 0.5s;
      fill: #3b82f6;
      stroke: #1d4ed8;
    }
    
    .neuron-node:nth-child(3n) {
      animation-delay: 1s;
      fill: #8b5cf6;
      stroke: #7c3aed;
    }
    
    .neuron-node:nth-child(4n) {
      animation-delay: 1.5s;
      fill: #06b6d4;
      stroke: #0891b2;
    }
  `;

  return (
    <div className={`relative ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <svg viewBox="0 0 545 498" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M503.107 311.81L503.476 312.277L503.873 311.833L506.516 308.874C507.128 309.577 507.5 310.495 507.5 311.5C507.5 313.709 505.709 315.5 503.5 315.5C501.291 315.5 499.5 313.709 499.5 311.5C499.5 310.405 499.94 309.413 500.653 308.69L503.107 311.81ZM503.5 307.5C504.343 307.5 505.125 307.762 505.77 308.207L503.523 310.722L501.438 308.071C502.04 307.709 502.746 307.5 503.5 307.5Z"
          className="neuron-node"
        />
        <path
          d="M468 106L519 153.5L447.5 61.5M468 106L400 120L447.5 61.5M468 106L447.5 61.5M447.5 61.5L391 71M447.5 61.5L333.5 6.5M354.5 95L396.5 120L391 71M391 71L354.5 91.5L375.5 43M391 71L375.5 43M375.5 43L326 50"
          className="synapse-path"
        />
        <path
          d="M322 48.5L334.5 6.5H300.5L272.5 33.5M322 48.5L272.5 33.5M322 48.5L282.5 78.5L272.5 33.5"
          className="synapse-path"
        />
        <path
          d="M231 67.5L280 75.5H286L313.5 83.7299M354.5 96L352.134 95.2919M352.134 95.2919L324 50.5L313.5 83.7299M352.134 95.2919L313.5 83.7299M313.5 83.7299L295 115L313.5 122.5M313.5 83.7299L316.5 125"
          className="synapse-path"
        />
        <path
          d="M78.5 148L129 168.5M129 168.5L142.5 121.5L111 64.5L71.5 83L90.5 39L133 29.5L108 64.5L160.5 81.5M129 168.5L180.5 216V161.5M129 168.5L180.5 161.5M160.5 81.5L147.5 114.5M160.5 81.5L166.686 66.5M180.5 33H142.5M180.5 33L230 10.5L232.5 66.5M180.5 33L166.686 66.5M232.5 66.5L147.5 114.5M232.5 66.5H166.686M147.5 114.5H211.5L216.5 192.5L180.5 161.5M472.5 274.5L504.5 313L536 274.5L493.5 244.5L515 199.5L477.5 204.5L438 235M30.5 133L67.5 81.5L74 143.5L34.5 184L30.5 133Z"
          className="synapse-path"
        />
        <path
          d="M29.5 134L4.5 229M4.5 229L34.5 181.5L47 216M4.5 229L41 276L34.5 235.5M4.5 229L29.5 298.5M47 216L91 205.5M47 216L34.5 235.5M47 216L75 147.5L87.5 202M91 205.5L68.5 235.5M91 205.5L137.5 235.5L175.5 216L91 205.5ZM91 205.5L124.5 171.5M68.5 235.5H34.5M68.5 235.5L83 262.5L91 290.5M29.5 298.5L41 325.5L91 290.5M29.5 298.5L34.5 276L91 290.5"
          className="synapse-path"
        />
        <path d="M235 9L274 33.5" className="synapse-path" />
        <path d="M300 6.5L232.5 11V70L214 114H293" className="synapse-path" />
        <path
          d="M283.5 76.5L293.5 111.5L218 189.5M218 189.5L283.5 181L243 224L179.5 214.5M218 189.5L179.5 214.5M179.5 214.5L176.6 218.5M136 274.5L176.6 218.5M136 274.5L104 237M136 274.5L91 290M138.5 277.5L234 264.5L176.6 218.5M136 237H104M104 237L82.5 261M91 290L82.5 338L121 342M91 290L145.715 317.829M91 373.5L78 338L41 327.5L91 373.5ZM91 373.5L154 352.5M154 352.5L186 384.5M154 352.5L121 342M186 384.5L182.5 335L149 319.5L145.715 317.829M186 384.5L222.5 342L186 335L207 302L170.5 285.5L145.715 317.829M186 384.5H234M121 342L145.715 317.829"
          className="synapse-path"
        />
        <path
          d="M93 374L186 385L251 405.5M251 405.5L297.5 385H232.5L251 405.5ZM251 405.5H291.5L323.5 428L355.5 432L376.5 446L381 481.5M381 481.5L408.5 466.5M381 481.5L404 497M408.5 466.5L404 497M408.5 466.5L434.5 497M408.5 466.5L381 446M408.5 466.5L431.008 458.709M404 497H434.5M434.5 497V457.5M434.5 457.5L431.008 458.709M434.5 457.5L444 432M431.008 458.709L412.5 446M412.5 446L444 432M412.5 446L420.5 405.5M444 432L420.5 405.5M444 432L462 380L420.5 405.5"
          className="synapse-path"
        />
        <path
          d="M502 354L466.5 380L407.5 370.5L424.5 409.5H375M375 409.5L379.5 447.5M375 409.5L325.5 426.5L299.5 380M375 409.5L341 397.5L346.5 370.5M375 409.5L378.737 385M299.5 380L346.5 370.5M299.5 380L264.5 346.5L233.5 385L227 346.5L260 295M346.5 370.5L379.5 380L378.737 385M346.5 370.5L364 333.5M346.5 370.5L317 333.5M364 333.5L407 367L378.737 385M364 333.5L438 329M364 333.5L329 295M317 333.5L329 295M317 333.5L293 320.5L260 301L264.5 340.5L260 295M329 295H260M329 295L282 263M260 295L211.5 301L237.5 267.5M260 295L237.5 267.5M282 263L247 224M282 263L237.5 267.5M172.5 287.5L185.5 272.5L136 277.5L172.5 287.5Z"
          className="synapse-path"
        />
        <path
          d="M282.5 182L330 170.5L314.5 124L295 115.5L294 118L282.5 177.5L287 218.5L330 243L362.5 218.5L411.5 182L394.851 250.5M438 232.5V277.5L394 254L394.851 250.5M438 232.5L473 273L493 243L477.5 207.5L468.5 170.5L438 201.5M438 232.5V201.5M438 232.5L394.851 250.5M438 201.5L415 182"
          className="synapse-path"
        />
        <path
          d="M361.5 220L394 252.5M361.5 220L330 172M361.5 220L375 156.5M394 252.5L330 245M394 252.5L383.5 294V297.5M330 245V294L383.5 297.5M330 245V172M383.5 297.5L366 334.5L440 330M383.5 297.5L440 330M383.5 297.5L440 278.5V330M440 330L500.5 310V352.5L536 273.5L540.5 228.5M440 330L474.5 273.5M282.5 262L286 220L330 172M330 172L375 153M375 153L413.5 182.5L468.5 168.5M375 153V156.5M375 153L319.5 127L354 97M375 156.5L399.5 121.5L413.5 178L468.5 106.5V168.5M468.5 168.5L518 153M518 153V201L517.5 236.75M518 153L540.5 228.5M540.5 228.5L517.5 236.75M494.5 245L517.5 236.75"
          className="synapse-path"
        />
        <path
          d="M500 355L438 329.5L408.481 368.214L407.5 369.5"
          className="synapse-path"
        />
        <path
          d="M108.5 61L74 147.5L143 117.5L180 162.5L210 117.5"
          className="synapse-path"
        />
        <path d="M139 28.5L233 10" className="synapse-path" />

        <circle cx="251.5" cy="404.5" r="4" className="neuron-node" />
        <circle cx="121" cy="342" r="2.5" className="neuron-node" />
        <circle cx="83" cy="262" r="2.5" className="neuron-node" />
        <circle cx="171" cy="285" r="2.5" className="neuron-node" />
        <circle cx="121" cy="342" r="2.5" className="neuron-node" />
        <circle cx="153" cy="353" r="2.5" className="neuron-node" />
        <circle cx="30" cy="296" r="2.5" className="neuron-node" />
        <circle cx="94.5" cy="372.5" r="4" className="neuron-node" />
        <circle cx="148.5" cy="316.5" r="4" className="neuron-node" />
        <circle cx="46.5" cy="214.5" r="4" className="neuron-node" />
        <circle cx="211.5" cy="114.5" r="4" className="neuron-node" />
        <circle cx="215.5" cy="191.5" r="4" className="neuron-node" />
        <circle cx="179.5" cy="162.5" r="4" className="neuron-node" />
        <circle cx="178.5" cy="214.5" r="4" className="neuron-node" />
        <circle cx="135.5" cy="234.5" r="4" className="neuron-node" />
        <circle cx="135.5" cy="274.5" r="4" className="neuron-node" />
        <circle cx="246.5" cy="223.5" r="4" className="neuron-node" />
        <circle cx="236.5" cy="265.5" r="4" className="neuron-node" />
        <circle cx="260.5" cy="296.5" r="4" className="neuron-node" />
        <circle cx="224.5" cy="343.5" r="4" className="neuron-node" />
        <circle cx="210.5" cy="302.5" r="4" className="neuron-node" />
        <circle cx="265.5" cy="343.5" r="4" className="neuron-node" />
        <circle cx="299.5" cy="381.5" r="4" className="neuron-node" />
        <circle cx="299.5" cy="381.5" r="4" className="neuron-node" />
        <circle cx="324.5" cy="425.5" r="4" className="neuron-node" />
        <circle cx="349.5" cy="368.5" r="4" className="neuron-node" />
        <circle cx="329.5" cy="293.5" r="4" className="neuron-node" />
        <circle cx="282.5" cy="261.5" r="4" className="neuron-node" />
        <circle cx="286.5" cy="218.5" r="4" className="neuron-node" />
        <circle cx="328.5" cy="243.5" r="4" className="neuron-node" />
        <circle cx="362.5" cy="219.5" r="4" className="neuron-node" />
        <circle cx="362.5" cy="219.5" r="4" className="neuron-node" />
        <circle cx="329.5" cy="171.5" r="4" className="neuron-node" />
        <circle cx="282.5" cy="180.5" r="4" className="neuron-node" />
        <circle cx="294.5" cy="114.5" r="4" className="neuron-node" />
        <circle cx="231.5" cy="66.5" r="4" className="neuron-node" />
        <circle cx="137.5" cy="28.5" r="4" className="neuron-node" />
        <circle cx="109.5" cy="62.5" r="4" className="neuron-node" />
        <circle cx="160.5" cy="81.5" r="4" className="neuron-node" />
        <circle cx="144.5" cy="117.5" r="4" className="neuron-node" />
        <circle cx="231.5" cy="9.5" r="4" className="neuron-node" />
        <circle cx="273.5" cy="32.5" r="4" className="neuron-node" />
        <circle cx="323.5" cy="49.5" r="4" className="neuron-node" />
        <circle cx="323.5" cy="49.5" r="4" className="neuron-node" />
        <circle cx="281.5" cy="76.5" r="4" className="neuron-node" />
        <circle cx="354.5" cy="94.5" r="4" className="neuron-node" />
        <circle cx="315.5" cy="124.5" r="4" className="neuron-node" />
        <circle cx="413.5" cy="180.5" r="4" className="neuron-node" />
        <circle cx="468.5" cy="167.5" r="4" className="neuron-node" />
        <circle cx="518.5" cy="153.5" r="4" className="neuron-node" />
        <circle cx="468.5" cy="105.5" r="4" className="neuron-node" />
        <circle cx="468.5" cy="105.5" r="4" className="neuron-node" />
        <circle cx="394.5" cy="252.5" r="4" className="neuron-node" />
        <circle cx="385.5" cy="296.5" r="4" className="neuron-node" />
        <circle cx="363.5" cy="333.5" r="4" className="neuron-node" />
        <circle cx="407.5" cy="368.5" r="4" className="neuron-node" />
        <circle cx="376.5" cy="408.5" r="4" className="neuron-node" />
        <circle cx="376.5" cy="446.5" r="4" className="neuron-node" />
        <circle cx="424.5" cy="407.5" r="4" className="neuron-node" />
        <circle cx="407.5" cy="466.5" r="4" className="neuron-node" />
        <circle cx="407.5" cy="466.5" r="4" className="neuron-node" />
        <circle cx="434.5" cy="457.5" r="4" className="neuron-node" />
        <circle cx="380.5" cy="484.5" r="4" className="neuron-node" />
        <circle cx="433.5" cy="493.5" r="4" className="neuron-node" />
        <circle cx="402.5" cy="493.5" r="4" className="neuron-node" />
        <circle cx="463.5" cy="377.5" r="4" className="neuron-node" />
        <circle cx="499.5" cy="353.5" r="4" className="neuron-node" />
        <circle cx="438.5" cy="329.5" r="4" className="neuron-node" />
        <circle cx="535.5" cy="274.5" r="4" className="neuron-node" />
        <circle cx="472.5" cy="274.5" r="4" className="neuron-node" />
        <circle cx="437.5" cy="278.5" r="4" className="neuron-node" />
        <circle cx="494.5" cy="243.5" r="4" className="neuron-node" />
        <circle cx="540.5" cy="229.5" r="4" className="neuron-node" />
        <circle cx="476.5" cy="205.5" r="4" className="neuron-node" />
        <circle cx="518.5" cy="201.5" r="4" className="neuron-node" />
        <circle cx="446.5" cy="61.5" r="4" className="neuron-node" />
        <circle cx="376.5" cy="41.5" r="4" className="neuron-node" />
        <circle cx="334.5" cy="4.5" r="4" className="neuron-node" />
        <circle cx="299.5" cy="5.5" r="4" className="neuron-node" />
        <circle cx="315.5" cy="124.5" r="4" className="neuron-node" />
        <circle cx="398.5" cy="118.5" r="4" className="neuron-node" />
        <circle cx="74.5" cy="146.5" r="4" className="neuron-node" />
        <circle cx="128.5" cy="167.5" r="4" className="neuron-node" />
        <circle cx="66.5" cy="81.5" r="4" className="neuron-node" />
        <circle cx="90.5" cy="204.5" r="4" className="neuron-node" />
        <circle cx="33.5" cy="182.5" r="4" className="neuron-node" />
        <circle cx="28.5" cy="131.5" r="4" className="neuron-node" />
        <circle cx="4.5" cy="228.5" r="4" className="neuron-node" />
        <circle cx="37.5" cy="274.5" r="4" className="neuron-node" />
        <circle cx="42.5" cy="325.5" r="4" className="neuron-node" />
        <circle cx="90.5" cy="288.5" r="4" className="neuron-node" />
        <circle cx="79.5" cy="337.5" r="4" className="neuron-node" />
        <circle cx="184.5" cy="334.5" r="4" className="neuron-node" />
        <circle cx="231.5" cy="385.5" r="4" className="neuron-node" />
        <circle cx="184.5" cy="381.5" r="4" className="neuron-node" />
      </svg>
    </div>
  );
};

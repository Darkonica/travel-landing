function toggle(el, className) {
  el.classList.contains(className) ? el.classList.remove(className) : el.classList.add(className);
}

document.querySelectorAll('.custom-select').forEach(oldSelect => {
  // Wrapper for whole select
  let wrapper = document.createElement('div');
  wrapper.classList.add('select');

  // Add <select> to wrapper
  oldSelect.parentNode.insertBefore(wrapper, oldSelect);
  wrapper.appendChild(oldSelect);
  oldSelect.classList.add('select-hidden');

  // Add new custom select
  let selectStyled = document.createElement('div');
  selectStyled.classList.add('select-styled');
  selectStyled.innerHTML = oldSelect.children[0].innerHTML; // placeholder
  wrapper.appendChild(selectStyled);

  // Add options container
  let optionsStyled = document.createElement('ul');
  optionsStyled.classList.add('select-options');

  // options to li tags, without first one (placeholder)
  for (let i = 1; i < oldSelect.children.length; i++) {
    let li = document.createElement('li');
    li.setAttribute('rel', oldSelect.children[i].value);
    li.innerHTML = oldSelect.children[i].innerHTML;
    optionsStyled.appendChild(li);
  }

  wrapper.appendChild(optionsStyled);

  // Listeners
  selectStyled.addEventListener('click', function(e) {
    e.stopPropagation();
    let allSelects = document.querySelectorAll('.select-styled')
    ;[...allSelects].filter(item => item != this).forEach(item => item.classList.remove('active'));
    toggle(selectStyled, 'active');
  });

  optionsStyled.addEventListener('click', function(e) {
    e.stopPropagation();
    selectStyled.innerHTML = e.target.innerHTML;
    oldSelect.value = e.target.getAttribute('rel');
    toggle(selectStyled, 'active');
  });

  window.addEventListener('click', function() {
    selectStyled.classList.remove('active');
  });
});

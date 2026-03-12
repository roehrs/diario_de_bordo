import React, { useState, useRef } from 'react';
import { 
  CheckSquare, 
  Square, 
  FileDown, 
  Printer, 
  Settings2, 
  FileText,
  UserCheck,
  MapPin,
  BookOpen,
  ClipboardList,
  Package,
  Calendar,
  Activity,
  ShieldCheck,
  Monitor,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [ocupacaoSelecionada, setOcupacaoSelecionada] = useState('');
  const [nomeOcupacaoCustom, setNomeOcupacaoCustom] = useState('');
  
  // Estado para controlar quais módulos estarão no documento gerado
  const [modulos, setModulos] = useState({
    planejamentoSemanal: true,
    atividadesPraticas: true,
    aulasTeoricas: false,
    interacaoModelo: false,
    saidaCampo: false,
    controleInsumos: false,
    ferramentasSoftware: false,
    organizacaoAmbiente: true,
    ergonomia: true,
    simulados: true,
    feedback: true
  });

  const previewRef = useRef(null);

  // Cores da Marca SENAC
  const BRAND = {
    blue: '#004a8d',
    orange: '#f6821f'
  };

  // Pre-sets baseados nos Descritivos Técnicos
  const presetsOcupacoes = {
    'Cabeleireiro': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: true, saidaCampo: false, controleInsumos: true, 
      ferramentasSoftware: false, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },
    'Confeitaria': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: false, saidaCampo: false, controleInsumos: true, 
      ferramentasSoftware: false, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },'Cozinha': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: false, saidaCampo: false, controleInsumos: true, 
      ferramentasSoftware: false, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },
    'Cuidados de Saúde e Apoio Social': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: true, saidaCampo: true, controleInsumos: false, 
      ferramentasSoftware: false, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },
    'Desenvolvimento de Sistemas': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: false, saidaCampo: false, controleInsumos: false, 
      ferramentasSoftware: true, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },
    'Estética e Bem-Estar': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: true, saidaCampo: false, controleInsumos: true, 
      ferramentasSoftware: false, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    },
    'Recepção de Hotel': {
      planejamentoSemanal: true, atividadesPraticas: true, aulasTeoricas: false, 
      interacaoModelo: true, saidaCampo: false, controleInsumos: false, 
      ferramentasSoftware: true, organizacaoAmbiente: true, ergonomia: true, 
      simulados: true, feedback: true
    }
  };

  const handleOcupacaoChange = (ocupacao) => {
    setOcupacaoSelecionada(ocupacao);
    setNomeOcupacaoCustom(ocupacao);
    if (presetsOcupacoes[ocupacao]) {
      setModulos(presetsOcupacoes[ocupacao]);
    }
  };

  const toggleModulo = (modulo) => {
    setModulos(prev => ({ ...prev, [modulo]: !prev[modulo] }));
    setOcupacaoSelecionada(''); // Limpa o select visualmente se o utilizador personalizar
  };

  const getNomeExibicao = () => {
    return nomeOcupacaoCustom || '_____________________________________';
  };

  // Função para exportar o preview HTML para um ficheiro Word (.doc)
  const exportarParaWord = () => {
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Diário de Bordo - ${getNomeExibicao()}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11pt; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #000; padding: 6px; text-align: left; vertical-align: top; }
          th { background-color: #f2f2f2; font-weight: bold; }
          h1 { color: ${BRAND.blue}; font-size: 18pt; text-align: center; }
          h2 { color: #333; font-size: 14pt; text-align: center; }
          h3 { color: ${BRAND.blue}; font-size: 12pt; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 20px; }
          p { margin: 5px 0; }
        </style>
      </head><body>
    `;
    const footer = "</body></html>";
    
    const htmlToExport = previewRef.current.innerHTML;
    const sourceHTML = header + htmlToExport + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `Diario_${getNomeExibicao().replace(/\s+/g, '_')}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const imprimirPDF = () => {
    const printContent = previewRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        ${printContent}
      </div>
    `;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); 
  };

  const modulosDisponiveis = [
    { id: 'planejamentoSemanal', label: 'Planejamento Semanal (Cronograma)', icon: <Calendar className="w-5 h-5 mr-2" /> },
    { id: 'atividadesPraticas', label: 'Atividades Práticas (Test Projects)', icon: <Settings2 className="w-5 h-5 mr-2" /> },
    { id: 'organizacaoAmbiente', label: 'Organização do Ambiente e Biossegurança', icon: <ShieldCheck className="w-5 h-5 mr-2" /> },
    { id: 'interacaoModelo', label: 'Interação com Cliente / Paciente / Modelo', icon: <UserCheck className="w-5 h-5 mr-2" /> },
    { id: 'ergonomia', label: 'Ergonomia e Postura', icon: <Activity className="w-5 h-5 mr-2" /> },
    { id: 'controleInsumos', label: 'Controle de Insumos e Materiais', icon: <Package className="w-5 h-5 mr-2" /> },
    { id: 'ferramentasSoftware', label: 'Softwares, Frameworks e Versionamento', icon: <Monitor className="w-5 h-5 mr-2" /> },
    { id: 'saidaCampo', label: 'Saídas de Campo / Visitas Técnicas', icon: <MapPin className="w-5 h-5 mr-2" /> },
    { id: 'aulasTeoricas', label: 'Aulas Teóricas / Cursos Extras', icon: <BookOpen className="w-5 h-5 mr-2" /> },
    { id: 'simulados', label: 'Simulados e Avaliação de Tempo', icon: <ClipboardList className="w-5 h-5 mr-2" /> },
    { id: 'feedback', label: 'Feedback e Avaliação do Treinador', icon: <FileText className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-gray-800">
      
      {/* HEADER SENAC */}
      <header className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-sm border-b-4 mb-8 flex items-center justify-between p-6" style={{ borderColor: BRAND.orange }}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded bg-[#004a8d] flex items-center justify-center mr-4">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: BRAND.blue }}>Competições Senac</h1>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Gerador de Diário de Bordo Oficial</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm" style={{ backgroundColor: BRAND.orange }}>
            Área do Treinador
          </span>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUNA ESQUERDA: CONTROLES (4 colunas) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CARD DE SELEÇÃO DE OCUPAÇÃO */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4" style={{ borderTopColor: BRAND.blue }}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 text-sm">1</span>
              Selecione a Ocupação
            </h2>

            <div className="space-y-4">
              <div>
                <select 
                  value={ocupacaoSelecionada}
                  onChange={(e) => handleOcupacaoChange(e.target.value)}
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 outline-none transition-all shadow-sm"
                  style={{ focusRingColor: BRAND.blue }}
                >
                  <option value="" disabled={ocupacaoSelecionada !== ''}>Selecione o descritivo técnico...</option>
                  {Object.keys(presetsOcupacoes).map(ocup => (
                    <option key={ocup} value={ocup}>{ocup}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Ou preencha manualmente:</label>
                <input 
                  type="text" 
                  value={nomeOcupacaoCustom}
                  onChange={(e) => {
                    setNomeOcupacaoCustom(e.target.value);
                    setOcupacaoSelecionada('');
                  }}
                  placeholder="Ex: Joalheria, Florística..."
                  className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* CARD DE MÓDULOS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4" style={{ borderTopColor: BRAND.orange }}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center mr-2 text-sm">2</span>
              Ajuste os Módulos
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Marque os itens que compõem o treinamento desta ocupação para personalizar o documento.
            </p>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {modulosDisponiveis.map(mod => (
                <div 
                  key={mod.id}
                  onClick={() => toggleModulo(mod.id)}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    modulos[mod.id] 
                      ? 'bg-[#f0f7ff] border-[#004a8d] shadow-sm' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mr-3" style={{ color: modulos[mod.id] ? BRAND.blue : '#9ca3af' }}>
                    {modulos[mod.id] ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </div>
                  <div className="flex items-center flex-1">
                    <span className="text-gray-500">{mod.icon}</span>
                    <span className={`text-sm ml-1 ${modulos[mod.id] ? 'font-bold text-[#004a8d]' : 'font-medium text-gray-600'}`}>
                      {mod.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: PREVIEW DO DOCUMENTO (8 colunas) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg border border-gray-200 min-h-[1056px] w-full relative">
            
            {/* Tag visual de preview */}
            <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-bl-lg border-b border-l border-gray-200">
              PRÉ-VISUALIZAÇÃO A4
            </div>

            {/* ÁREA QUE SERÁ EXPORTADA */}
            <div ref={previewRef} className="document-content mt-4" style={{ fontFamily: 'Arial, sans-serif', color: '#000', lineHeight: '1.4' }}>
              
              {/* CABEÇALHO DO DOC */}
              <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: `2px solid ${BRAND.blue}`, paddingBottom: '15px' }}>
                <h1 style={{ color: BRAND.blue, fontSize: '20px', margin: '0 0 5px 0', fontWeight: 'bold' }}>DIÁRIO DE BORDO E RELATÓRIO DE TREINAMENTO</h1>
                <h2 style={{ color: '#333', fontSize: '16px', margin: '0' }}>Ocupação: {getNomeExibicao()}</h2>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '11pt' }}>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '6px', width: '50%' }}><strong>Treinador(a) Escolar:</strong> <br/><br/></td>
                    <td style={{ border: '1px solid #000', padding: '6px', width: '50%' }}><strong>Competidor(a):</strong> <br/><br/></td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '6px' }}><strong>Unidade Escolar/Universidade:</strong> <br/><br/></td>
                    <td style={{ border: '1px solid #000', padding: '6px' }}><strong>Data do Treinamento:</strong> <br/><br/></td>
                  </tr>
                </tbody>
              </table>

              {/* MÓDULOS DINÂMICOS */}
              {modulos.planejamentoSemanal && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>
                    PLANEJAMENTO SEMANAL (CRONOGRAMA DE ATIVIDADES)
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '10pt', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '20%' }}>Envolvido</th>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '16%' }}>Seg</th>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '16%' }}>Ter</th>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '16%' }}>Qua</th>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '16%' }}>Qui</th>
                         <th style={{ border: '1px solid #000', padding: '4px', width: '16%' }}>Sex</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold' }}>Competidor</td>
                        <td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold' }}>Docente</td>
                        <td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td>
                        <td style={{ border: '1px solid #000', padding: '6px' }}></td><td style={{ border: '1px solid #000', padding: '6px' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.atividadesPraticas && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>ATIVIDADES PRÁTICAS REALIZADAS (TEST PROJECTS / MÓDULOS)</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '25%' }}>Módulo / TP</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '75%' }}>Descrição da Execução e Desempenho</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ border: '1px solid #000', padding: '20px' }}></td><td style={{ border: '1px solid #000', padding: '20px' }}></td></tr>
                      <tr><td style={{ border: '1px solid #000', padding: '20px' }}></td><td style={{ border: '1px solid #000', padding: '20px' }}></td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.organizacaoAmbiente && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>ORGANIZAÇÃO DO AMBIENTE E BIOSSEGURANÇA</h3>
                  <div style={{ border: '1px solid #000', padding: '10px', marginTop: '10px', fontSize: '11pt' }}>
                    <p style={{ margin: '0 0 10px 0' }}><em>Avaliação do checklist da estação de trabalho, níveis de prioridade, pausas, foco, limpeza e higiene.</em></p>
                    <div style={{ height: '60px', borderBottom: '1px dotted #ccc', marginBottom: '10px' }}></div>
                    <div style={{ height: '30px', borderBottom: '1px dotted #ccc' }}></div>
                  </div>
                </div>
              )}

              {modulos.interacaoModelo && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>INTERAÇÃO COM CLIENTE / PACIENTE / MODELO</h3>
                  <div style={{ border: '1px solid #000', padding: '10px', marginTop: '10px', fontSize: '11pt' }}>
                    <p style={{ margin: '0 0 10px 0' }}><strong>Perfil Atendido:</strong> __________________________________________________________________</p>
                    <p style={{ margin: '0 0 10px 0' }}><em>Avaliação da relação técnica, respeito à autonomia, análise do histórico e clareza nas orientações/atendimento.</em></p>
                    <div style={{ height: '40px', borderBottom: '1px dotted #ccc', marginBottom: '10px' }}></div>
                    <div style={{ height: '30px', borderBottom: '1px dotted #ccc' }}></div>
                  </div>
                </div>
              )}

              {modulos.ergonomia && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>ERGONOMIA E POSTURA</h3>
                  <div style={{ border: '1px solid #000', padding: '10px', marginTop: '10px', fontSize: '11pt' }}>
                    <p style={{ margin: '0 0 5px 0' }}><em>Observação da postura física do competidor durante a execução das tarefas e prevenção de lesões.</em></p>
                    <div style={{ height: '40px', borderBottom: '1px dotted #ccc' }}></div>
                  </div>
                </div>
              )}

              {modulos.controleInsumos && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>CONTROLE DE INSUMOS E EQUIPAMENTOS</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '40%' }}>Material / Equipamento</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '60%' }}>Observações (Faltas, Desperdício, Avarias)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ border: '1px solid #000', padding: '15px' }}></td><td style={{ border: '1px solid #000', padding: '15px' }}></td></tr>
                      <tr><td style={{ border: '1px solid #000', padding: '15px' }}></td><td style={{ border: '1px solid #000', padding: '15px' }}></td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.ferramentasSoftware && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>SOFTWARES, FRAMEWORKS E VERSIONAMENTO</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '40%' }}>Tecnologia / Repositório (Ex: Git)</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '60%' }}>Avaliação do Uso e Boas Práticas (Arquitetura, Testes)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ border: '1px solid #000', padding: '20px' }}></td><td style={{ border: '1px solid #000', padding: '20px' }}></td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.saidaCampo && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>SAÍDA DE CAMPO / VISITA TÉCNICA (AMBIENTAÇÃO)</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f2f2f2', width: '30%', fontWeight: 'bold' }}>Local Visitado / Data:</td>
                        <td style={{ border: '1px solid #000', padding: '6px', width: '70%' }}></td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '6px', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Objetivo e Foco Clínico/Técnico:</td>
                        <td style={{ border: '1px solid #000', padding: '6px' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

{modulos.aulasTeoricas && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>AULAS TEÓRICAS / CURSOS EXTRAS</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '40%' }}>Tema / Curso / Assunto</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '60%' }}>Conhecimento Adquirido / Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={{ border: '1px solid #000', padding: '20px' }}></td><td style={{ border: '1px solid #000', padding: '20px' }}></td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.simulados && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>SIMULADOS E AVALIAÇÃO DE TEMPO</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11pt', textAlign: 'center' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f2f2f2' }}>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '40%', textAlign: 'left' }}>Módulo Simulado</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '20%' }}>Tempo Previsto</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '20%' }}>Tempo Realizado</th>
                         <th style={{ border: '1px solid #000', padding: '6px', width: '20%' }}>Pontuação Atingida</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'left' }}></td>
                        <td style={{ border: '1px solid #000', padding: '10px' }}></td><td style={{ border: '1px solid #000', padding: '10px' }}></td><td style={{ border: '1px solid #000', padding: '10px' }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {modulos.feedback && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: BRAND.blue, fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '3px', marginTop: '15px' }}>J. FEEDBACK, PARECER TÉCNICO E PRÓXIMOS PASSOS</h3>
                  <div style={{ border: '1px solid #000', padding: '10px', marginTop: '10px', fontSize: '11pt' }}>
                    <p style={{ margin: '0 0 5px 0' }}><strong>Pontos Fortes (Habilidades Desenvolvidas):</strong></p>
                    <div style={{ height: '40px', borderBottom: '1px dotted #ccc', marginBottom: '10px' }}></div>
                    <p style={{ margin: '10px 0 5px 0' }}><strong>Oportunidades de Melhoria (Gaps identificados):</strong></p>
                    <div style={{ height: '40px', borderBottom: '1px dotted #ccc', marginBottom: '10px' }}></div>
                    <p style={{ margin: '10px 0 5px 0' }}><strong>Foco e Metas para o próximo ciclo de treinamento:</strong></p>
                    <div style={{ height: '40px', borderBottom: '1px dotted #ccc' }}></div>
                  </div>
                </div>
              )}

              {/* ASSINATURAS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', paddingBottom: '30px' }}>
                <div style={{ textAlign: 'center', width: '45%' }}>
                  <div style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '11pt' }}>
                    <strong>Assinatura do Competidor(a)</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'center', width: '45%' }}>
                  <div style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '11pt' }}>
                    <strong>Assinatura do Treinador Escolar</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTÕES DE EXPORTAÇÃO (CENTRALIZADOS NO FINAL) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[900px]">
            <button 
              onClick={exportarParaWord}
              className="flex-1 max-w-[300px] flex items-center justify-center py-3 px-6 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND.blue }}
            >
              <FileDown className="w-5 h-5 mr-2" />
              Baixar Word (.doc)
            </button>
            <button 
              onClick={imprimirPDF}
              className="flex-1 max-w-[300px] flex items-center justify-center py-3 px-6 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND.orange }}
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimir / PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}